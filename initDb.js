const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db', (err) => {
  if (err) {
    console.error('Failed to open database:', err.message);
    return;
  }
  console.log('Connected to the SQLite database.');
});

// Initialize the commission_sharing table
function initializeDatabase() {
  return new Promise((resolve, reject) => {
    // Create table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS commission_sharing (
        id INTEGER PRIMARY KEY,
        redVision INTEGER,
        fixerra INTEGER,
        mfd INTEGER
      )
    `, (err) => {
      if (err) {
        reject('Error creating table:', err.message);
      } else {
        resolve('Table created or already exists');
      }
    });
  });
}

// Check if default values are needed and insert them
function checkAndInsertDefaultValues() {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM commission_sharing WHERE id = 1', (err, row) => {
      if (err) {
        reject('Error reading commission_sharing:', err.message);
      }
      if (!row) {
        db.run('INSERT INTO commission_sharing (id, redVision, fixerra, mfd) VALUES (1, 20, 20, 60)', (err) => {
          if (err) {
            reject('Error inserting default values:', err.message);
          } else {
            resolve('Default commission sharing values inserted');
          }
        });
      } else {
        resolve('Commission sharing settings already exist');
      }
    });
  });
}

// Run the initialization process
async function initialize() {
  try {
    await initializeDatabase();
    const message = await checkAndInsertDefaultValues();
    console.log(message);
  } catch (error) {
    console.error(error);
  } finally {
    // Close the database connection
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('Database connection closed');
      }
    });
  }
}

initialize();
