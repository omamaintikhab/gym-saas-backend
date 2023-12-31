import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { JwtModule } from '@nestjs/jwt';
import { ExpensesModule } from './expenses/expenses.module';
import { BusinessModule } from './business/business.module';
import { IncomeModule } from './income/income.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'gym-saas',
      entities: [],
      autoLoadEntities: true, 
      synchronize: true,
    }),
    UserModule,
    AuthenticationModule,
    ExpensesModule,
    BusinessModule,
    IncomeModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
