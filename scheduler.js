import { CronJob } from 'cron';
import dotenv from 'dotenv';
import db from './db-connection.js';
import { sendPendingSms } from './sms-sender.js';

// Load environment variables
dotenv.config();

const job1 = new CronJob(
	'*/5 * * * * *', // Run every 5 seconds
	async () => {
		try {
			// Warehouse creation job
			const [results] = await db.execute('CALL create__warehouse(?, ?, ?, ?)', ['Warehouse 1', 'Stock', 1, 0]);
			console.log('Warehouse creation query executed:', results);
		} catch (error) {
			console.error('Warehouse creation job error:', error);
		}
	},
	null, // onComplete
	false, // do not start immediately
	process.env.DB_TIMEZONE // timezone from env
);

const smsSenderJob = new CronJob(
	'0 9 * * *', // Har kuni soat 9:00 da run bo'ladi
	async () => {
		try {
			console.log('SMS sender job started...');
			await sendPendingSms();
		} catch (error) {
			console.error('SMS sender job error:', error);
		}
	},
	null, // onComplete
	false, // do not start immediately
	process.env.DB_TIMEZONE // timezone from env
);

// Optionally start jobs when needed
export function startWarehouseJob() {
	job1.start();
}

export function startSmsSenderJob() {
	smsSenderJob.start();
}

export function stopWarehouseJob() {
	job1.stop();
}

export function stopSmsSenderJob() {
	smsSenderJob.stop();
}

// Example of how to start jobs if needed
// startWarehouseJob();
// startSmsSenderJob();