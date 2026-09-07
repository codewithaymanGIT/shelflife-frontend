# ShelfLife — Secondhand Book Marketplace

A dense, information-rich secondhand/rare book marketplace built with React and Spring Boot — a deliberately different UX from a typical curated bookstore, focused on browsing by condition, edition, and price.

## Concept
Modeled after marketplaces like AbeBooks — listings emphasize condition grading, edition details, and ISBN rather than editorial recommendations, giving buyers the specifics collectors and students actually care about.

## Features
- Sidebar-filtered, sortable catalogue
- Detailed book listing pages with condition/edition metadata
- Client-side cart (React Context) with live badge count
- User registration and login (BCrypt-hashed passwords)
- REST API backend with MySQL persistence

## Tech Stack
**Frontend:** React 19, React Router, Vite, Context API
**Backend:** Spring Boot 4.1.1, Spring Data JPA, MySQL
**Security:** Spring Security Crypto (BCrypt)

## Architecture


## Setup

### Backend
1. Create `shelflife_db` in MySQL using the provided schema
2. Update `application.properties` with your DB credentials
3. Run `BookstoreReactSpringbootApplication`

### Frontend
1. `cd shelflife-frontend`
2. `npm install`
3. `npm run dev`
4. Visit `http://localhost:5173`

## API Endpoints
- `GET /api/books` — list all books
- `GET /api/books/{id}` — get one book
- `POST /api/auth/register` — create account
- `POST /api/auth/login` — authenticate