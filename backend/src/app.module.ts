import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import configuration from './config/configuration.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { WorkTypesModule } from './work-types/work-types.module.js';
import { JournalEntriesModule } from './journal-entries/journal-entries.module.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PrismaModule,
    WorkTypesModule,
    JournalEntriesModule,
    ...(isProduction
      ? [
          ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../..', 'client'),
          }),
        ]
      : []),
  ],
})
export class AppModule {}
