# JS Scheduler Cron 🕰️📦

## Project Description

A flexible Node.js-based cron job scheduler for automated tasks, including warehouse creation and SMS notifications.

## Features

- 🔄 Configurable cron jobs with precise control
- 🗃️ MariaDB integration
- 📱 SMS notification system with Eskiz API
- 🔒 Environment-based configuration
- 🚀 Modular and extensible architecture

## Project Structure

```
js-schedular-cron/
│
├── index.js          # Main entry point
├── .env              # Environment configuration
├── package.json      # Project dependencies
│
└── src/
    ├── scheduler.js      # Job scheduling and control
    ├── sms-sender.js     # SMS sending functionality
    └── db-connection.js  # Centralized database connection
```

## Project Structure Details

- `index.js`: Application entry point
- `src/scheduler.js`: Manages cron jobs and their lifecycle
- `src/sms-sender.js`: Handles SMS sending logic
- `src/db-connection.js`: Centralized database connection management

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MariaDB server

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/js-schedular-cron.git
cd js-schedular-cron
```

2. Install dependencies:
```bash
npm install
```

3. Create and configure `.env` file:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_TIMEZONE=Asia/Tashkent

ESKIZ_EMAIL=your_eskiz_email
ESKIZ_PASSWORD=your_eskiz_password
```

## Environment Configuration

The project uses environment variables for configuration. Follow these steps:

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and replace placeholder values:
```
# Database settings
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
DB_TIMEZONE=Asia/Tashkent

# Eskiz SMS API credentials
ESKIZ_EMAIL=your_email@example.com
ESKIZ_PASSWORD=your_api_password
```

### Environment Variables Explained

- `DB_HOST`: Database server address
- `DB_PORT`: Database server port
- `DB_USER`: Database username
- `DB_PASSWORD`: Database user password
- `DB_NAME`: Database name
- `DB_TIMEZONE`: Timezone for job scheduling
- `ESKIZ_EMAIL`: Eskiz API email
- `ESKIZ_PASSWORD`: Eskiz API password

**Important**: Never commit your `.env` file to version control. It contains sensitive information.

## Job Control

### Starting Jobs

```javascript
import { 
    startWarehouseJob, 
    startSmsSenderJob,
    stopWarehouseJob,
    stopSmsSenderJob 
} from './scheduler.js';

// Start specific jobs
startWarehouseJob();
startSmsSenderJob();

// Stop jobs when needed
stopWarehouseJob();
stopSmsSenderJob();
```

## Running the Application

- Development mode:
```bash
npm run dev
```

- Production mode:
```bash
npm start
```

## Configuration Options

### Cron Job Timing
Modify job intervals in `scheduler.js`:
- Default: Every 5 seconds (`*/5 * * * * *`)
- Customize based on your requirements

### Database Connection
- Centralized connection management in `db-connection.js`
- Connection pool with configurable limits

### SMS Notifications
- Configurable via environment variables
- Supports custom message templates

## Troubleshooting

- Database Connection Issues:
  - Check `.env` file credentials
  - Verify network access
- SMS Sending Failures:
  - Validate Eskiz API credentials
  - Check network connectivity

## Security Considerations

- Never commit `.env` file to version control
- Use strong, unique credentials
- Implement proper error handling
- Regularly update dependencies

## Logging

- Console logs for job executions
- Error tracking for database and SMS operations

## Performance Optimization

- Connection pooling
- Efficient error handling
- Modular design for easy scaling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC License

## Author

Dilbek Abdulazizov

---

**Caution**: Project is in active development. Test thoroughly before production use.