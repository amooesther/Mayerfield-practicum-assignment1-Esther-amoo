import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../src/config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const trainersData = [
  {
    id: 1,
    name: 'James Carter',
    role: 'Strength Training',
    category: 'Strength',
    bio: 'James helps members build strength, improve technique, and develop effective workout habits.',
    email: 'james@fitzone.com',
    image: '/images/james-carter.png',
    price: 'R350 / session',
  },
  {
    id: 2,
    name: 'Sarah Mitchell',
    role: 'Group Fitness',
    category: 'Group',
    bio: 'Sarah brings energy to every class and helps members stay motivated while reaching their goals.',
    email: 'sarah@fitzone.com',
    image: '/images/sarah-mitchell.png',
    price: 'R250 / session',
  },
  {
    id: 3,
    name: 'Daniel Brooks',
    role: 'Personal Training',
    category: 'Personal',
    bio: 'Daniel creates personalised training approaches to help members improve fitness and confidence.',
    email: 'daniel@fitzone.com',
    image: '/images/daniel-brooks.png',
    price: 'R400 / session',
  },
];

async function seedDatabase() {
  const client = await pool.connect();
  try {
    console.log('🌱 Starting database setup and seed...');

    // 1. Ensure schema tables exist
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await client.query(schemaSql);
    console.log('✅ Database schema verified/applied.');

    // 2. Insert or update products idempotently
    for (const trainer of trainersData) {
      const query = `
        INSERT INTO products (id, name, role, category, bio, email, image, price)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          role = EXCLUDED.role,
          category = EXCLUDED.category,
          bio = EXCLUDED.bio,
          email = EXCLUDED.email,
          image = EXCLUDED.image,
          price = EXCLUDED.price;
      `;
      await client.query(query, [
        trainer.id,
        trainer.name,
        trainer.role,
        trainer.category,
        trainer.bio,
        trainer.email,
        trainer.image,
        trainer.price,
      ]);
    }

    // Reset sequence so auto-increment works after manual IDs
    await client.query(`
      SELECT setval(pg_get_serial_sequence('products', 'id'), COALESCE(MAX(id), 1)) FROM products;
    `);

    console.log(`✅ Seeded ${trainersData.length} items successfully into 'products' table.`);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seedDatabase();

