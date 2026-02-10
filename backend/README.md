# Backend API

Node.js backend with Express for user management.

## Setup

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

Server runs on http://localhost:3000

## API Endpoints

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
  ```json
  {
    "fullName": "John Doe",
    "roles": ["Admin", "User"],
    "birthDate": "1990-05-15"
  }
  ```
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `POST /api/users/delete-multiple` - Delete multiple users
  ```json
  {
    "ids": [1, 2, 3]
  }
  ```
