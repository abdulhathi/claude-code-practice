# Diagrams

## 1. System Architecture

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#555555', 'primaryColor': '#dbeafe', 'primaryTextColor': '#1e293b', 'primaryBorderColor': '#3b82f6', 'secondaryColor': '#f0fdf4', 'tertiaryColor': '#fef9c3'}}}%%
graph TB
    subgraph Client["Client (port 5174)"]
        UI[React 19 + TypeScript]
        Router[React Router v7]
        Auth[Better Auth Client]
    end

    subgraph Server["Server (port 3000)"]
        Express[Express v5]
        BetterAuth[Better Auth]
        Middleware[requireAuth middleware]
        API[REST API routes]
        Claude[Anthropic Claude API]
    end

    subgraph Data["Data Layer"]
        Prisma[Prisma v7 ORM]
        PG[(PostgreSQL)]
    end

    subgraph External["External Services"]
        Anthropic[Anthropic API]
        SendGrid[SendGrid Inbound Parse]
    end

    UI --> Router
    Router --> Auth
    Auth -->|/api/auth/*| BetterAuth
    UI -->|/api/*| Middleware
    Middleware --> API
    BetterAuth --> Prisma
    API --> Prisma
    API --> Claude
    Claude --> Anthropic
    SendGrid -->|webhook POST /api/webhooks/email| API
    Prisma --> PG
```

---

## 2. Database Schema (Current)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#555555', 'primaryColor': '#dbeafe', 'primaryTextColor': '#1e293b', 'primaryBorderColor': '#3b82f6'}}}%%
erDiagram
    User {
        String id PK
        String name
        String email UK
        Boolean emailVerified
        String image
        Role role
        DateTime createdAt
        DateTime updatedAt
    }

    Session {
        String id PK
        DateTime expiresAt
        String token UK
        DateTime createdAt
        DateTime updatedAt
        String ipAddress
        String userAgent
        String userId FK
    }

    Account {
        String id PK
        String accountId
        String providerId
        String userId FK
        String accessToken
        String refreshToken
        String password
        DateTime createdAt
        DateTime updatedAt
    }

    Verification {
        String id PK
        String identifier
        String value
        DateTime expiresAt
        DateTime createdAt
        DateTime updatedAt
    }

    User ||--o{ Session : "has"
    User ||--o{ Account : "has"
```

---

## 3. Planned Schema (Phase 3+)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#555555', 'primaryColor': '#dbeafe', 'primaryTextColor': '#1e293b', 'primaryBorderColor': '#3b82f6'}}}%%
erDiagram
    User ||--o{ Ticket : "assigned to"
    User ||--o{ Message : "sends"
    Ticket ||--o{ Message : "has"

    Ticket {
        String id PK
        String subject
        String body
        TicketStatus status
        TicketCategory category
        String aiSummary
        String assignedToId FK
        DateTime createdAt
        DateTime updatedAt
    }

    Message {
        String id PK
        String body
        String ticketId FK
        String authorId FK
        Boolean isAiGenerated
        DateTime createdAt
    }
```

---

## 4. Authentication Flow

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#555555', 'primaryColor': '#dbeafe', 'primaryTextColor': '#1e293b', 'primaryBorderColor': '#3b82f6', 'actorBkg': '#dbeafe', 'actorBorder': '#3b82f6', 'activationBkgColor': '#f0fdf4', 'activationBorderColor': '#22c55e'}}}%%
sequenceDiagram
    actor User
    participant Client
    participant BetterAuth as Better Auth (/api/auth/*)
    participant DB as PostgreSQL

    User->>Client: Enter email + password
    Client->>BetterAuth: POST /api/auth/sign-in/email
    BetterAuth->>DB: Verify credentials (Account table)
    DB-->>BetterAuth: Valid
    BetterAuth->>DB: Create Session record
    BetterAuth-->>Client: Set session cookie
    Client-->>User: Redirect to dashboard

    Note over Client,DB: Subsequent protected requests

    Client->>BetterAuth: GET /api/auth/get-session
    BetterAuth->>DB: Look up session token
    DB-->>BetterAuth: Session + User
    BetterAuth-->>Client: User object (with role)
```

---

## 5. Ticket Lifecycle

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#555555', 'primaryColor': '#dbeafe', 'primaryTextColor': '#1e293b', 'primaryBorderColor': '#3b82f6'}}}%%
stateDiagram-v2
    [*] --> Open : Email received / manual creation

    Open --> Open : Agent replies
    Open --> Resolved : Agent marks resolved

    Resolved --> Open : Reopened
    Resolved --> Closed : Admin closes

    Closed --> [*]

    note right of Open
        AI classification runs on creation
        AI summary available on demand
        AI reply suggestions available
    end note
```

---

## 6. Request Flow (Protected API)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#555555', 'primaryColor': '#dbeafe', 'primaryTextColor': '#1e293b', 'primaryBorderColor': '#3b82f6', 'actorBkg': '#dbeafe', 'actorBorder': '#3b82f6', 'activationBkgColor': '#f0fdf4', 'activationBorderColor': '#22c55e'}}}%%
sequenceDiagram
    participant Client
    participant requireAuth as requireAuth middleware
    participant BetterAuth as Better Auth
    participant DB as PostgreSQL
    participant Handler as Route handler

    Client->>requireAuth: Request with session cookie
    requireAuth->>BetterAuth: api.getSession(req)
    BetterAuth->>DB: Look up token
    DB-->>BetterAuth: Session + User
    BetterAuth-->>requireAuth: session object

    alt Session valid
        requireAuth->>Handler: next() with req.user
        Handler-->>Client: 200 response
    else No session
        requireAuth-->>Client: 401 Unauthorized
    end
```
