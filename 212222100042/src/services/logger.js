
const LOGGING_ENDPOINT = 'http://20.244.56.144/evaluation-service/logs';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJha2VlcnRoaXZhc2FuMjAwNEBnbWFpbC5jb20iLCJleHAiOjE3NTI2NTc5MTksImlhdCI6MTc1MjY1NzAxOSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImNiZmI0MTBlLTcyODMtNDhkNy05MmE3LTQxN2YwZjczNWVmMCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImtlZXJ0aGkgdmFzYW4gYSIsInN1YiI6ImY2MzMwYjM5LWIzZDQtNGUwOC04NjhhLWQ0YTljOWUxMmFlNSJ9LCJlbWFpbCI6ImFrZWVydGhpdmFzYW4yMDA0QGdtYWlsLmNvbSIsIm5hbWUiOiJrZWVydGhpIHZhc2FuIGEiLCJyb2xsTm8iOiIyMTIyMjIyNDAwNDgiLCJhY2Nlc3NDb2RlIjoicWd1Q2ZmIiwiY2xpZW50SUQiOiJmNjMzMGIzOS1iM2Q0LTRlMDgtODY4YS1kNGE5YzllMTJhZTUiLCJjbGllbnRTZWNyZXQiOiJ0WVZqZXh5c0VDakpld2ZSIn0.htoInD-bO1WwEdU2OWPpP4PpOiyyeT2vYmSThFI29jc';

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