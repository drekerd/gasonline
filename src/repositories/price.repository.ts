import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FuelPrice } from 'src/schemas/fuel-price.schema';
import { Fuel, FuelDocument } from 'src/schemas/fuel.schema';

// export class FuelDto {
//   name: string;
//   id: string;
//   stationId: number;
//   price: number;
//   fuel: string;
//   lastUpdated: string;
//   city: string;
// }

@Injectable()
export class FuelPriceRepository {
  constructor(
    @InjectModel(FuelPrice.name) private fuelPriceModel: Model<FuelPrice>,
  ) {}

  createFuelPrice(fuelPriceDto: FuelPrice): Promise<any> {
    console.log('fuelPriceDTO', fuelPriceDto);
    const createdFuelPrice = new this.fuelPriceModel({
      fuelExternalId: fuelPriceDto.fuelExternalId,
      stationExternalId: fuelPriceDto.stationExternalId,
      price: fuelPriceDto.price,
      date: fuelPriceDto.date,
    });

    console.log('fuelPriceTOSAVE', createdFuelPrice);

    return createdFuelPrice.save();
  }

  async getFuelPricesByFuelAndStationExternalId(
    stationExternalId: number,
    fuelExternalId: number,
  ) {
    return await this.fuelPriceModel
      .find({
        stationExternalId: stationExternalId,
        fuelExternalId: fuelExternalId,
      })
      .sort({ date: -1 })
      .limit(1);
  }
}
