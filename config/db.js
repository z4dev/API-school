const { Pool } = require('pg');


const pool = new Pool({
  host: process.env.DB_HOST || 'aws-1-us-east-2.pooler.supabase.com',
  port: process.env.DB_PORT || 6543,
  database: process.env.DB_NAME || 'postgres',
  user: process.env.DB_USER || 'postgres.tzimnqapenslcbdlojft',
  password: process.env.DB_PASSWORD || 'ez123321ez1',
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection error:", err);
  }
};

module.exports = { pool, connectDB };
