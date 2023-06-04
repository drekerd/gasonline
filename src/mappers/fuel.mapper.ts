import { Injectable } from '@nestjs/common';
import { Fuel } from 'src/dto/fuel.dto';
import { StationRawConvert } from 'src/dto/station.dto';

@Injectable()
export class FuelMapper {
  convertServerResponseToFuelList(station: StationRawConvert): Fuel[] {
    const fuelsToReturn: Fuel[] = [];
    const { fuels } = station;

    if (!fuels) {
      return [];
    }

    for (const fuel of fuels) {
      const newFuel = new Fuel(fuel.fuelId, fuel.fuelType);
      fuelsToReturn.push(newFuel);
    }
    return fuelsToReturn;
  }
}
