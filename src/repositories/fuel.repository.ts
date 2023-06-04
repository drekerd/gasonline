import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
export class FuelRepository {
  constructor(@InjectModel(Fuel.name) private fuelModel: Model<Fuel>) {}

  createFuel(fuelDto: Fuel): Promise<any> {
    const createdFuel = new this.fuelModel({
      externalId: fuelDto.externalId,
      typeOfFuel: fuelDto.typeOfFuel,
    });

    return createdFuel.save();
  }

  getFuelById(externalId: number): Promise<Fuel> {
    return this.fuelModel
      .findOne({ externalId: externalId })
      .exec()
      .then((fuel) => fuel);
  }

  async updateFuel(fuel: Fuel): Promise<any> {
    return await this.fuelModel.updateOne<FuelDocument>(
      { externalId: fuel.externalId },
      {
        $set: {
          externalId: fuel.externalId,
          typeOfFuel: fuel.typeOfFuel,
        },
      },
      { upsert: true },
    );
  }

  async findAllByCity(city: string): Promise<Fuel[]> {
    // const fuels: Fuel[] = [];

    const returnedFuels = await this.fuelModel.find({ city: city });

    // for (const returnedFuel of returnedFuels) {
    //   const fuel = new Fuel();
    //   fuel.id = returnedFuel.id;
    //   fuel.name = returnedFuel.name;
    //   fuel.stationId = returnedFuel.stationId;
    //   fuel.price = returnedFuel.price;
    //   fuel.fuel = returnedFuel.fuel;
    //   fuel.lastUpdated = returnedFuel.lastUpdated;
    //   fuel.city = returnedFuel.city;

    //   fuels.push(fuel);
    // }

    return returnedFuels;
  }

  async findAllByCityAndTypeOfFuel(
    city: string,
    typeOfFuel: string,
  ): Promise<Fuel[]> {
    // const fuels: Fuel[] = [];

    const returnedFuels = await this.fuelModel.find({
      city: city,
      fuel: typeOfFuel,
    });

    // for (const returnedFuel of returnedFuels) {
    //   const fuel = new Fuel();
    //   fuel.id = returnedFuel.id;
    //   fuel.name = returnedFuel.name;
    //   fuel.stationId = returnedFuel.stationId;
    //   fuel.price = returnedFuel.price;
    //   fuel.fuel = returnedFuel.fuel;
    //   fuel.lastUpdated = returnedFuel.lastUpdated;
    //   fuel.city = returnedFuel.city;

    //   fuels.push(fuel);
    // }

    return returnedFuels;
  }
}
