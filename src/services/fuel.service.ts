import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Fuel } from 'src/dto/fuel.dto';
import { FuelRepository } from 'src/repositories/fuel.repository';
import { FuelPriceRepository } from 'src/repositories/price.repository';
import { FuelPrice } from 'src/schemas/fuel-price.schema';

@Injectable()
export class FuelService {
  constructor(
    private readonly fuelRepository: FuelRepository,
    private readonly fuelPriceRepository: FuelPriceRepository,
    private readonly httpService: HttpService,
  ) {}

  /**
   * This method was changed after getting services API access.
   * Update was no longer necessary unless type of fuel name changes.
   * I can revise a strategy to update after some time if necessary
   * @param fuels
   * @returns
   */
  async createOrUpdateFuel(fuels: Fuel[]): Promise<any> {
    try {
      for (const fuel of fuels) {
        const fuelExist = await this.fuelRepository.getFuelById(
          fuel.externalId,
        );

        console.log('fuel Exist', fuelExist);

        if (fuelExist) {
          this.fuelRepository.updateFuel(fuel);
        } else {
          this.fuelRepository.createFuel(fuel);
        }
      }

      return Promise.resolve(true);
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(err),
      });
    }
  }

  async createOrUpdateFuelPrice(fuelsPrice: FuelPrice[]): Promise<any> {
    console.log('cona');
    for (const fuelPrice of fuelsPrice) {
      this.fuelPriceRepository.createFuelPrice(fuelPrice);
    }

    return Promise.resolve(true);
  }

  async findCheapestFuelByCity(city: string, typeOfFuel: string) {
    const fuels = await this.fuelRepository.findAllByCityAndTypeOfFuel(
      city,
      typeOfFuel,
    );

    return '';
  }

  findById(id: number): Promise<any> {
    return this.fuelRepository.getFuelById(id);
  }

  async findAllByCity(city: string): Promise<Fuel[]> {
    return await this.fuelRepository.findAllByCity(city);
  }

  async getFuelPricesByFuelAndStationExternalId(
    stationExternalId: number,
    fuelExternalId: number,
  ) {
    return this.fuelPriceRepository.getFuelPricesByFuelAndStationExternalId(
      stationExternalId,
      fuelExternalId,
    );
  }

  findFiveCheapestFuels(fuels) {
    fuels.sort(function (a, b) {
      if (a.price.price < b.price.price) {
        return -1;
      }
      if (a.price.price > b.price.price) {
        return 1;
      }
      return 0;
    });

    return fuels.slice(0, 5);
  }
}
