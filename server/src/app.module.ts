import { Module } from '@nestjs/common';
import { SiteModule } from './site/site.module';
import { Site } from './entities/site.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './entities/user.entity';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../../client", "dist"),
      renderPath: '/',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'z10mz10m',
      database: 'passwords_manager',
      entities: [
        Site,
        User
      ],
      synchronize: true,
      logging: true,
      namingStrategy: new SnakeNamingStrategy()
    }),
    SiteModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule { }
