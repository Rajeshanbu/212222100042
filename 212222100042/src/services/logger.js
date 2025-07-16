
const LOGGING_ENDPOINT = 'http://20.244.56.144/evaluation-service/logs';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJyYWplc2hhbmJ1MTgwMkBnbWFpbC5jb20iLCJleHAiOjE3NTI2NTc0NjIsImlhdCI6MTc1MjY1NjU2MiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjdkMzIyMWQ1LTEyZDUtNDkyMC05MDAzLTg3Y2ZmYWExNjRkNyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InJhamVzaCBhIiwic3ViIjoiNmE1YTg0NGYtYWFkOC00MWE2LTkwYTYtMjUyZGFkNjhkMWFlIn0sImVtYWlsIjoicmFqZXNoYW5idTE4MDJAZ21haWwuY29tIiwibmFtZSI6InJhamVzaCBhIiwicm9sbE5vIjoiMjEyMjIyMTAwMDQyIiwiYWNjZXNzQ29kZSI6InFndUNmZiIsImNsaWVudElEIjoiNmE1YTg0NGYtYWFkOC00MWE2LTkwYTYtMjUyZGFkNjhkMWFlIiwiY2xpZW50U2VjcmV0Ijoid1RNWGdwanh1dlBFVXh2biJ9.t8aGiaVIEZz7OqlLRWJDJb0g2MrluKKqqvPmv3HEsMA';

/**
 * Sends a log entry to the remote logging service.
 * @param {string} level - The log level (e.g., 'INFO', 'ERROR').
 * @param {string} message - The main log message.
 * @param {object} details - Additional structured data for the log.
 */
const sendLog = async (level, message, details = {}) => {
  try {
    const payload = {
      team_name: "Keerthi Vasan A", 
      log_level: level,
      message: message,
      timestamp: new Date().toISOString(),
      details: details,
    };

    const response = await fetch(LOGGING_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('Failed to send log to remote server:', response.status, await response.text());
    }
  } catch (error) {
    console.error('Error sending log:', error);
  }
};

const logger = {
  info: (message, details) => {
    console.log(`[INFO] ${message}`, details || ''); 
    sendLog('INFO', message, details);
  },
  warn: (message, details) => {
    console.warn(`[WARN] ${message}`, details || ''); 
    sendLog('WARN', message, details);
  },
  error: (message, details) => {
    console.error(`[ERROR] ${message}`, details || ''); 
    sendLog('ERROR', message, details);
  },
};

export default logger;
