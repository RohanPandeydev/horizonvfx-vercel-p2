# Authentication API Documentation

## Overview

Complete authentication system with JWT tokens stored in the database. Includes sign up, login, logout, refresh token, and forgot password functionality.

## Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Database

Update your `.env` file with your PostgreSQL database URL:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/horizonvfx?schema=public"
```

Run Prisma migrations:

```bash
npx prisma generate
npx prisma db push
```

### 3. Configure Environment Variables

Update `.env` with your configuration:

```env
# JWT Secrets (CHANGE THESE IN PRODUCTION!)
JWT_ACCESS_SECRET="your-super-secret-access-token-key"
JWT_REFRESH_SECRET="your-super-secret-refresh-token-key"

# Token Expiration
ACCESS_TOKEN_EXPIRES_IN="15m"
REFRESH_TOKEN_EXPIRES_IN="7d"

# Frontend URL
FRONTEND_URL="http://localhost:3000"
```

## API Endpoints

### 1. Sign Up

**POST** `/api/auth/signup`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201 Created):**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "clmxxxxx",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "emailVerified": false,
    "createdAt": "2025-01-11T00:00:00.000Z",
    "updatedAt": "2025-01-11T00:00:00.000Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Password Requirements:**
- At least 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

### 2. Login

**POST** `/api/auth/login`

Authenticate with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "clmxxxxx",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "emailVerified": false,
    "createdAt": "2025-01-11T00:00:00.000Z",
    "updatedAt": "2025-01-11T00:00:00.000Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Logout

**POST** `/api/auth/logout`

Invalidate all tokens for the user (logout from all devices).

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (200 OK):**
```json
{
  "message": "Logout successful"
}
```

### 4. Refresh Token

**POST** `/api/auth/refresh`

Get a new access token using a refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "message": "Token refreshed successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 5. Forgot Password

**POST** `/api/auth/forgot-password`

Request a password reset link via email.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200 OK):**
```json
{
  "message": "If an account with this email exists, a password reset link has been sent",
  "devMode": {
    "resetLink": "http://localhost:3000/auth/reset-password?token=abc123..."
  }
}
```

**Note:** In development mode, the reset link is returned in the response. In production, this would be sent via email.

### 6. Reset Password

**POST** `/api/auth/reset-password`

Reset password using the token received from forgot password.

**Request Body:**
```json
{
  "token": "abc123...",
  "password": "NewPassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Password reset successfully. Please login with your new password."
}
```

### 7. Get Current User

**GET** `/api/auth/me`

Get the currently authenticated user's information.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "clmxxxxx",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "emailVerified": false,
    "createdAt": "2025-01-11T00:00:00.000Z",
    "updatedAt": "2025-01-11T00:00:00.000Z"
  }
}
```

## Token Management

### Access Token
- **Expiration:** 15 minutes (configurable)
- **Usage:** Include in `Authorization` header for authenticated requests
- **Storage:** Database (can be revoked)

### Refresh Token
- **Expiration:** 7 days (configurable)
- **Usage:** Get new access tokens without re-authenticating
- **Storage:** Database (can be revoked)

### Using Tokens in Frontend

```typescript
// After login/signup, store tokens securely
const { accessToken, refreshToken } = response;

// Use access token in API calls
const response = await fetch('/api/protected', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});

// When access token expires, use refresh token
const refreshResponse = await fetch('/api/auth/refresh', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ refreshToken })
});
```

## Protecting Routes

Use the `authenticate` middleware function to protect your API routes:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/middleware';

export async function GET(request: NextRequest) {
  const authResult = await authenticate(request);

  if (authResult.error) {
    return NextResponse.json(
      { error: authResult.error },
      { status: authResult.status }
    );
  }

  // Access the authenticated user
  const { userId, email, role } = authResult.user;

  // Your protected route logic here
  return NextResponse.json({ message: 'Protected data' });
}
```

## Error Responses

All endpoints may return these error responses:

**400 Bad Request:**
```json
{
  "error": "Validation failed",
  "details": {
    "email": "Invalid email format",
    "password": "Password must be at least 8 characters long"
  }
}
```

**401 Unauthorized:**
```json
{
  "error": "Invalid or expired token"
}
```

**404 Not Found:**
```json
{
  "error": "User not found"
}
```

**409 Conflict:**
```json
{
  "error": "User with this email already exists"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error"
}
```

## Security Features

1. **Password Hashing:** All passwords are hashed using bcrypt with 12 rounds
2. **Token Storage in Database:** All tokens are stored in the database and can be revoked
3. **Token Expiration:** Both access and refresh tokens have configurable expiration times
4. **Secure Password Reset:** Reset tokens expire after 1 hour
5. **Email Enumeration Prevention:** Forgot password always returns success, even if email doesn't exist

## Database Schema

### User Model
- `id`: Unique identifier (cuid)
- `email`: User email (unique)
- `password`: Hashed password
- `firstName`: User's first name (optional)
- `lastName`: User's last name (optional)
- `role`: User role (default: "user")
- `emailVerified`: Email verification status
- `verificationToken`: Email verification token
- `resetToken`: Password reset token
- `resetTokenExpires`: Reset token expiration
- `createdAt`: Account creation date
- `updatedAt`: Last update date

### Token Model
- `id`: Unique identifier (cuid)
- `token`: JWT token string (unique)
- `userId`: Reference to user
- `type`: Token type ('access' or 'refresh')
- `expiresAt`: Token expiration date
- `createdAt`: Token creation date

## Next Steps

1. **Email Integration:** Implement email sending for password reset and email verification
2. **Rate Limiting:** Add rate limiting to prevent brute force attacks
3. **Email Verification:** Implement email verification flow
4. **OAuth Integration:** Add Google, GitHub, etc. OAuth providers
5. **Two-Factor Authentication:** Add 2FA support
6. **Session Management:** Add device tracking and session management
