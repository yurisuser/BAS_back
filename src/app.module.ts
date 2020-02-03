import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AnaliticModule } from './analitic/analitic.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'work',
      password: 'qwerty12345',
      database: 'analitic',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      charset: 'utf8mb4',
    }),
    UserModule,
    AuthModule,
    AnaliticModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
