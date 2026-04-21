import pkg from 'pg';
const { Pool } = pkg;

const POSTGRES_URI = process.env.POSTGRES_URI;

if (!POSTGRES_URI) {
  throw new Error('Please define the POSTGRES_URI environment variable');
}

let cached = global.pg;

if (!cached) {
  cached = global.pg = { pool: null };
}

async function dbConnect() {
  if (cached.pool) {
    return cached.pool;
  }

  const pool = new Pool({
    connectionString: POSTGRES_URI,
  });

  try {
    // test connection
    await pool.query('SELECT 1');
    console.log('PostgreSQL connected');

    cached.pool = pool;
  } catch (e) {
    cached.pool = null;
    throw e;
  }

  return cached.pool;
}

export default dbConnect;