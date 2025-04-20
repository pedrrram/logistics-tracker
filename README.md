# Logistics Package Tracker
A backend system for managing and tracking logistics packages with role-based access control and input validation.

## Technologies
- Node.js, Express.js
- MongoDB, Mongoose
- JWT, Bcrypt, Joi
- Swagger

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/pedrrram/logistics-tracker.git
   cd logistics-tracker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with:
   ```plaintext
   MONGO_URI=mongodb://localhost:27017/logistics
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   ```
4. Run the app:
   ```bash
   npm start
   ```

## User Roles
- **Customer**: Can register directly via `/api/auth/register`, create, view, and edit their own packages.
- **Driver**: Can view and update the status of assigned packages. Must be registered by an Admin.
- **Admin**: Can manage all packages, assign drivers, and register users with any role.

## API Endpoints
| Endpoint             | Method | Description                                      | Roles Allowed          | Authentication Required |
|----------------------|--------|--------------------------------------------------|------------------------|------------------------|
| `/api/auth/register` | POST   | Register a new user (non-customer roles require Admin) | All (Customer by default) | No                     |
| `/api/auth/login`    | POST   | Authenticate user, return JWT token, set HTTP-only cookie | All                    | No                     |
| `/api/auth/logout`   | POST   | Logout user and clear HTTP-only cookie           | All                    | No                     |
| `/api/packages`      | POST   | Create a new package                             | Customer               | Yes                    |
| `/api/packages`      | GET    | Get packages based on role                       | All                    | Yes                    |
| `/api/packages/:id`  | PUT    | Update package (role-based)                      | Customer, Driver, Admin | Yes                    |
| `/api/packages/:id`  | DELETE | Delete a package                                 | Customer, Admin        | Yes                    |


## API Documentation
Access Swagger docs at `/api-docs`.

### Using Swagger UI
1. Run the server (`npm start` or `docker-compose up`).
2. Open `http://localhost:3000/api-docs` in your browser.
3. Use the Swagger UI to:
   - View all API endpoints, request bodies, and possible responses.
   - Test endpoints directly by clicking **Try it out** and entering data.
4. **Authentication**:
   - Register a user via `/api/auth/register` (no authentication needed).
   - Login via `/api/auth/login` to receive a JWT token and set an HTTP-only cookie.
   - For protected routes (e.g., `/api/packages`):
     - The HTTP-only cookie (`token`) is automatically sent by the browser if you logged in.
     - Alternatively, copy the JWT token from the login response and enter it in the **Authorize** button (select `bearerAuth`).
5. Note: Ensure you are using the same browser session for cookie-based authentication.
