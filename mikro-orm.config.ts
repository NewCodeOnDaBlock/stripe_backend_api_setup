import { MySqlConnection } from '@mikro-orm/mysql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Payment } from 'src/modules/payment/entities/payment.entity';
import { defineConfig } from '@mikro-orm/mysql';

export default defineConfig({
  dbName: 'stripe_practice_db',
  user: 'root',
  password: '',
  host: '127.0.0.1',
  port: 3306,
  entities: [Payment],
  driverOptions: MySqlConnection,
  metadataProvider: TsMorphMetadataProvider,
  metadataCache: { enabled: true },
});
