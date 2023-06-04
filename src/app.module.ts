import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Fuel, FuelSchema } from './schemas/fuel.schema';
import { FuelService } from './services/fuel.service';
import { FuelRepository } from './repositories/fuel.repository';
import { HttpModule } from '@nestjs/axios';
import { FetchDataService } from './services/fetch-data.service';
import { UserService } from './services/users.services';
import { UserController } from './controllers/users.controller';
import { UserRepository } from './repositories/user.repository';
import { UserDao, UserSchema } from './schemas/user.schema';
import { StationService } from './services/station.service';
import { StationRepository } from './repositories/station.repository';
import { Station, StationSchema } from './schemas/station.schema';
import { UserMapper } from './mappers/user.mapper';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth-strategies/local.strategy';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth-strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { StationMapper } from './mappers/station.mapper';
import { FuelMapper } from './mappers/fuel.mapper';
import { FuelPriceMapper } from './mappers/fuelPrice.mapper';
import { FuelPriceRepository } from './repositories/price.repository';
import { FuelPrice, FuelPriceSchema } from './schemas/fuel-price.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://localhost:27070/gasonline',
      }),
    }),
    MongooseModule.forFeature([
      {
        name: Fuel.name,
        schema: FuelSchema,
      },
      {
        name: FuelPrice.name,
        schema: FuelPriceSchema,
      },
      {
        name: UserDao.name,
        schema: UserSchema,
      },
      {
        name: Station.name,
        schema: StationSchema,
      },
    ]),
    JwtModule.register({
      secret: 'testSecret',
    }),
    PassportModule,
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [
    AppService,
    UserService,
    FetchDataService,
    FuelService,
    StationService,
    AuthService,
    FuelRepository,
    UserRepository,
    StationRepository,
    FuelPriceRepository,
    UserMapper,
    StationMapper,
    FuelMapper,
    FuelPriceMapper,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
