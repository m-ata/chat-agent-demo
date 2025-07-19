import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Issue } from './entities/issue';
import { WithLengthColumnType } from 'typeorm/driver/types/ColumnTypes.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'root',
  database: 'local_db',
  synchronize: true,
  logging: false,
  entities: [Issue],
});
AppDataSource.driver.supportedDataTypes.push('vector' as WithLengthColumnType)
