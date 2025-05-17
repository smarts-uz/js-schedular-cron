import axios from 'axios';
import dotenv from 'dotenv';
import db from './db-connection.js';

// Load environment variables
dotenv.config();

const ESKIZ_EMAIL = process.env.ESKIZ_EMAIL || 'admin@eskiz.uz';
const ESKIZ_PASSWORD = process.env.ESKIZ_PASSWORD || 'admin';

// === GET TOKEN FROM ESKIZ ===
async function getEskizToken(email, password) {
    try {
        const response = await axios.post('https://notify.eskiz.uz/api/auth/login', {
            email: email,
            password: password
        });
        return response.data.data.token;
    } catch (error) {
        console.error('Token olishda xato:', error);
        throw error;
    }
}

// === SEND SMS WITH ESKIZ ===
async function sendSms(token, phone, message) {
    try {
        const response = await axios.post('https://notify.eskiz.uz/api/message/sms/send', {
            mobile_phone: phone,
            message: message,
            from: '4546'  // Eskiz default sender
        }, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('SMS yuborishda xato:', error);
        throw error;
    }
}

// === MAIN FUNCTION ===
export async function sendPendingSms() {
    try {
        // Fetch pending SMS notifications
        const [rows] = await db.execute(
            "SELECT id, phone, message FROM app_user_notifications WHERE is_notified = 0 or is_notified is null"
        );

        if (rows.length === 0) {
            console.log("SMS yuborish uchun xabar yo'q.");
            return;
        }

        // Get Eskiz token
        const token = await getEskizToken(ESKIZ_EMAIL, ESKIZ_PASSWORD);

        // Send each SMS
        for (const row of rows) {
            const result = await sendSms(token, row.phone, row.message || 'Bu Eskiz dan test');
            
            // Update notification status
            await db.execute(
                "UPDATE app_user_notifications SET is_notified = 1, date_notified = ? WHERE id = ?", 
                [new Date(), row.id]
            );
            
            console.log(`${row.phone} raqamiga yuborildi: ${JSON.stringify(result)}`);
        }

    } catch (error) {
        console.error(`SMS yuborish xatosi: ${error}`);
    }
}

// Agar skript to'g'ridan-to'g'ri ishga tushirilsa
if (import.meta.url === `file://${process.argv[1]}`) {
    sendPendingSms()
        .catch(console.error)
        .finally(() => process.exit(0));
} 