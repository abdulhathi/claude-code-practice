# AI-Powered Ticket Management System

## Problem
We received hundreds of support emails daily. Our agents manually read, classify, and respond to each ticket - which is slow and leads to impersonal, canned responses.

## Solution
Build a ticket manangment system that uses AI to automatically classify, respond to and route support tickets - delivering faster and more personalized reponses to students while freeing up agents for complex issues.

## Features

- Received support emails and create tickets.
- Auto-generate humen-friendly reponses using a knowledge base.
- Ticket list with filtering and sorting
- AI-Powered ticket classification
- AI-summaries
- AI-suggested replies
- User management (admin only)
- Dashboard to view and manage all tickets

## Data Model

### Ticket Statuses
- **Open** — ticket has been received and is awaiting resolution
- **Resolved** — agent has addressed the ticket
- **Closed** — ticket is fully complete

### Ticket Categories
- General questions
- Technical questions
- Refund requests

## Roles & Permissions

- **Admin** — full access; can create and manage agent accounts
- **Agent** — can view and respond to tickets