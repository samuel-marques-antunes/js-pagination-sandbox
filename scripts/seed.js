const db = require('../db/index')

async function createUsersTable() {
    const createUserDatabase = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

    try {
        await db.query(createUserDatabase);
        console.log("Users table ensured.");
    } catch (error) {
        console.error("Error creating users table:", error);
        throw error;
    }
}

async function populateUsers() {
    // Define an array of user objects to be inserted.
    const users = [
        { name: 'Alice Johnson', email: 'alice.johnson@example.com' },
        { name: 'Bob Smith', email: 'bob.smith@example.com' },
        { name: 'Charlie Brown', email: 'charlie.brown@example.com' },
        { name: 'Diana Ross', email: 'diana.ross@example.com' },
        { name: 'Edward Norton', email: 'edward.norton@example.com' },
        { name: 'Fiona Apple', email: 'fiona.apple@example.com' },
        { name: 'George Michael', email: 'george.michael@example.com' },
        { name: 'Helen Hunt', email: 'helen.hunt@example.com' },
        { name: 'Ian McKellen', email: 'ian.mckellen@example.com' },
        { name: 'Jessica Alba', email: 'jessica.alba@example.com' },
        { name: 'Kevin Bacon', email: 'kevin.bacon@example.com' },
        { name: 'Laura Linney', email: 'laura.linney@example.com' }
    ];

    // Insert each user into the database.
    const insertQuery = `INSERT INTO public."users" (name, email) VALUES ($1, $2) RETURNING id;`;

    for (const user of users) {
        try {
            const res = await db.query(insertQuery, [user.name, user.email]);
            console.log(`Inserted user with id: ${res.rows[0].id}`);
        } catch (error) {
            console.error(`Error inserting ${user.name}:`, error);
        }
    }
}

async function main() {
    try {
        await createUsersTable();
        await populateUsers();
    } catch (error) {
        console.error("An error occurred during the seeding process:", error);
    } finally {
        // Ensure the connection is closed gracefully.
        await db.end();
        console.log("Database connection closed.");
    }
}

main();