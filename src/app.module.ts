import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Fuel, FuelSchema } from './schemas/fuel.schema';
import { FuelService } from './services/fuel.service';
import { FuelRepository } from './repositories/fuel.respository';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://localhost:27020/gasonline',
      }),
    }),
    MongooseModule.forFeature([
      {
        name: Fuel.name,
        schema: FuelSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, FuelService, FuelRepository],
})
export class AppModule {}
