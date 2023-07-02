import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import config from 'ormconfig';
import { User } from './entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Topic } from './entities/topic.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [
    UserModule,
    CommentModule,

    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.local.env',
          // envFilePath: '.prod.env',
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Topic, Comment],
        synchronize: configService.get<boolean>('DB_SYNC'),
      }),
      inject: [ConfigService],
    }),

    // TypeOrmModule.forRoot(),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: '',
    //   database: 'postgres',
    //   entities: [User],
    //   synchronize: true,
    // }),
  ],
  // imports: [
  //   TypeOrmModule.forRootAsync({
  //     imports: [ConfigModule],
  //     useFactory: (configService: ConfigService) => ({
  //       type: 'mysql',
  //       host: configService.get('TYPEORM_HOST'),
  //       port: configService.get('TYPEORM_PORT'),
  //       username: configService.get('TYPEORM_USERNAME'),
  //       password: configService.get('TYPEORM_PASSWORD'),
  //       database: configService.get('TYPEORM_DATABASE'),
  //       autoLoadEntities: true,
  //       synchronize: configService.get('TYPEORM_SYNCHRONIZE'),
  //     }),
  //     inject: [ConfigService],
  //   }),
  // ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
