// ormconfig.ts
import { Order } from 'src/db/entities/order.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'WXuKXTrjLzLc1BP',
  database: process.env.DB_NAME || 'postgres',
  entities: [Order],
  migrations: ['dist/src/migrations/*.js'],
});
