const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'123456',
  database: 'vacation_listings', // Your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to the database Yash.');
});

const dbPromise = db.promise(); 

module.exports=dbPromise;