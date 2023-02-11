import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fuel, FuelDocument } from 'src/schemas/fuel.schema';

export class FuelDto {
  name: string;
  id: string;
  stationId: number;
  price: number;
  fuel: string;
  lastUpdated: Date;
  city: string;
}

@Injectable()
export class FuelRepository {
  constructor(@InjectModel(Fuel.name) private fuelModel: Model<FuelDocument>) {}

  createFuel(fuelDto: FuelDto): Promise<any> {
    const createdFuel = new this.fuelModel({
      name: fuelDto.name,
      id: fuelDto.id,
      stationId: fuelDto.stationId,
      fuel: fuelDto.fuel,
      lastUpdated: fuelDto.lastUpdated,
      price: fuelDto.price,
    });

    console.log(createdFuel);
    return createdFuel.save();
  }

  getFuelById(id: string): Promise<any> {
    return this.fuelModel.findById({ id: id }).exec();
  }

  async getAllExercises(): Promise<FuelDocument[]> {
    const cona = await this.fuelModel
      .find()
      .exec()
      .then((coninha) => {
        console.log('conas', coninha);
        return coninha;
      });
    console.log('coninha', cona);
    return cona;
  }
}
