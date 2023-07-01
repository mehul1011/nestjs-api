import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import config from 'ormconfig';

@Module({
  imports: [UserModule, CommentModule, TypeOrmModule.forRoot(config)],
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
