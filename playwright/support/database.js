const { Pool } = require('pg');

require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

async function cleanupTestData() {
  const client = await pool.connect();
  try {
    console.log("🧹 Limpando registros de teste...");

    await client.query('BEGIN');

    const query = `
      WITH users_to_delete AS (
        SELECT id FROM users WHERE email LIKE '%email.com'
      ),
      deleted_links AS (
        DELETE FROM links
        WHERE user_id IN (SELECT id FROM users_to_delete)
      )
      DELETE FROM users
      WHERE id IN (SELECT id FROM users_to_delete);
    `;

    const result = await client.query(query);

    await client.query('COMMIT');
    console.log("✨ Registros removidos com sucesso!");
  } catch (err) {
    await client.query('ROLLBACK');
    console.error("❌ Erro ao remover dados de teste:", err.message);
  } finally {
    client.release();
  }
}

module.exports = {  cleanupTestData }
