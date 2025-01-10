import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

// Ensure proper path resolution
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create a new SQLite3 database instance and ensure the correct path
const db = new sqlite3.Database(
  path.join(__dirname, '../booking_system.sqlite'), // Ensure the path to your SQLite database is correct
  (err) => {
    if (err) {
      console.error('Error opening database:', err.message) // Log any error with database connection
    } else {
      console.log('Database connection established.')
    }
  },
)

// Set the busy timeout to 5000 milliseconds (5 seconds)
db.run('PRAGMA busy_timeout = 10000', (err) => {
  if (err) {
    console.error('Error setting busy timeout:', err.message)
  } else {
    console.log('Busy timeout set to 5000ms')
  }
})

const PORT = 5002 // Ensure that your port is set correctly

// Export the db instance and port for use in other files
export { db, PORT }
