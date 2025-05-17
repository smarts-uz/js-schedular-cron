import { CronJob } from 'cron';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const job1 = new CronJob(
	'*/5 * * * * *', // Run every 5 seconds
	async () => {
		try {
			const connection = await mysql.createConnection({
				host: process.env.DB_HOST,
				port: process.env.DB_PORT,
				database: process.env.DB_NAME,
				user: process.env.DB_USER,
				password: process.env.DB_PASSWORD
			});

			const [results] = await connection.execute('CALL create__warehouse(?, ?, ?, ?)', ['Warehouse 1', 'Stock', 1, 0]);
			console.log('Warehouse creation query executed:', results);

			await connection.end();
		} catch (error) {
			console.error('Error executing warehouse creation job:', error);
		}
	},
	null, // onComplete
	true, // start immediately
	process.env.DB_TIMEZONE // timezone from env
);

job1.start();