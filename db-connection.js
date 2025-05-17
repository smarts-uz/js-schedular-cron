import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Singleton database connection pool
class DatabaseConnection {
    static #instance = null;
    #pool = null;

    constructor() {
        if (DatabaseConnection.#instance) {
            return DatabaseConnection.#instance;
        }

        this.#pool = mysql.createPool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        DatabaseConnection.#instance = this;
    }

    // Get a connection from the pool
    async getConnection() {
        return await this.#pool.getConnection();
    }

    // Execute query directly
    async execute(sql, params = []) {
        const connection = await this.getConnection();
        try {
            return await connection.execute(sql, params);
        } finally {
            connection.release();
        }
    }

    // Close the pool
    async close() {
        if (this.#pool) {
            await this.#pool.end();
        }
    }
}

// Export a singleton instance
export default new DatabaseConnection(); 