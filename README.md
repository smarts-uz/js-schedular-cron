# JS Scheduler Cron 🕰️📦

## Project Description

This project is a Node.js-based cron job scheduler designed for automatic warehouse creation in MariaDB.

## Features

- 🔄 Automatic cron job running every 5 seconds
- 🗃️ MariaDB integration
- 🔒 Configuration via environment variables
- 🚀 Easy setup and development

## Getting Started

### Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)
- MariaDB server

### Installation

1. Clone the project:
```bash
git clone https://github.com/your-username/js-schedular-cron.git
cd js-schedular-cron
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file and set up configurations:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=dbname
DB_TIMEZONE=Asia/Tashkent
```

### Running the Project

- Development mode:
```bash
npm run dev
```

- Production mode:
```bash
npm start
```

## Configuration

- Modify cron job timing in `index.js`
- Adjust database parameters in the `.env` file

## Troubleshooting

- Database connection issues: Check your `.env` file
- Cron job not working: Verify Node.js and package versions

## Workflow

1. The script connects to the specified MariaDB database
2. Executes a stored procedure to create a warehouse
3. Logs the results or any errors
4. Repeats every 5 seconds

## Security Considerations

- Use strong, unique database credentials
- Keep `.env` file private
- Implement proper error handling

## Logging

- Console logs for successful warehouse creation
- Error logging for connection or execution issues

## Scaling and Performance

- Adjust cron interval as needed
- Monitor database connection performance
- Consider connection pooling for high-load scenarios

## Contribution

1. Fork the project
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

ISC License

## Author

Dilbek Abdulazizov

---

**Caution**: Project is in active development. Test thoroughly before production use.