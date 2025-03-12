## Setup

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open the `.env` file and update the values as needed.
3. Execute the following command to create and run the PostgreSQL database container:
   ```bash
   docker-compose -f docker_compose_postgres.yml up
   ```
4. Run the command below to install project dependencies:
  ```bash
   npm install
   ```
5. Run the command below to seed the database:
  ```bash
   npm run seed
   ```
6. Run the command below to start the Node.js backend:
   ```bash
   npm run start
   ```

## Test APIs

- Get all users: http://localhost:3000/users
- Get user by id: http://localhost:3000/users/1
- Get users with page-based pagination: http://localhost:3000/users/page?page=1&size=5
- Get users with offset-based pagination: http://localhost:3000/users/offset?offset=3&size=5
- Get users with cursor-based pagination: http://localhost:3000/users/cursor?cursor=3&size=5
