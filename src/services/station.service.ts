import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StationDto } from '../dto/station.dto';
import { StationRepository } from '../repositories/station.repository';
import { Station } from '../schemas/station.schema';

@Injectable()
export class StationService {
  constructor(private readonly stationRepository: StationRepository) {}

  async createOrUpdateStation(stations: StationDto[]): Promise<any> {
    try {
      for (const station of stations) {
        const stationExist = await this.stationRepository.getStationById(
          station.externalId,
        );

        console.log('stationExist', stationExist);

        //Create a builder for this
        const stationToSaveOrUpdate = new Station();
        stationToSaveOrUpdate.externalId = station.externalId;
        stationToSaveOrUpdate.name = station.name;
        stationToSaveOrUpdate.status = station.status;
        stationToSaveOrUpdate.registryDate = station.registryDate;
        stationToSaveOrUpdate.entityName = station.entityName;
        stationToSaveOrUpdate.brand = station.brand;
        stationToSaveOrUpdate.district = station.district;
        stationToSaveOrUpdate.city = station.city;
        stationToSaveOrUpdate.address = station.address;
        stationToSaveOrUpdate.parish = station.parish;
        stationToSaveOrUpdate.postalCode = station.postalCode;
        stationToSaveOrUpdate.latitude = station.latitude;
        stationToSaveOrUpdate.longitude = station.longitude;
        stationToSaveOrUpdate.use = station.use;
        stationToSaveOrUpdate.type = station.type;
        stationToSaveOrUpdate.observations = station.observations;
        stationToSaveOrUpdate.weekDaysSchedule = station.weekDaysSchedule;
        stationToSaveOrUpdate.weekDaysOpeningHours =
          station.weekDaysOpeningHours;
        stationToSaveOrUpdate.weekDaysClosingHours =
          station.weekDaysClosingHours;
        stationToSaveOrUpdate.saturdaySchedule = station.saturdaySchedule;
        stationToSaveOrUpdate.saturdayOpeningHours =
          station.saturdayOpeningHours;
        stationToSaveOrUpdate.saturdayClosingHours =
          station.saturdayClosingHours;
        stationToSaveOrUpdate.sundaySchedule = station.sundaySchedule;
        stationToSaveOrUpdate.sundayOpeningHours = station.sundayOpeningHours;
        stationToSaveOrUpdate.sundayClosingHours = station.sundayClosingHours;
        stationToSaveOrUpdate.holidaySchedule = station.holidaySchedule;
        stationToSaveOrUpdate.holidayOpeningHours = station.holidayOpeningHours;
        stationToSaveOrUpdate.holidayClosingHours = station.holidayClosingHours;
        stationToSaveOrUpdate.fuels = station.fuels;

        if (stationExist) {
          await this.stationRepository.updateStation(stationToSaveOrUpdate);
        } else {
          console.log('stationToSaveOrUpdate', stationToSaveOrUpdate);
          await this.stationRepository.createStation(stationToSaveOrUpdate);
        }
      }

      return Promise.resolve(true);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(err),
      });
    }
  }

  async findStationByExternalId(
    stationExternalId: number | number[],
    filters?: Map<string, string>,
  ) {
    const stations = await this.stationRepository.findStationByExternalId(
      stationExternalId,
      filters,
    );
    return this.sortStationsByPriceAscending(stations);
  }

  async findStationByCheapestFuelByCity(city: string, type: string) {
    const stations = await this.stationRepository.findStationByCity(city, type);

    return this.sortStationsByPriceAscending(stations);
  }

  private sortStationsByPriceAscending(stations) {
    stations.sort(function (a, b) {
      console.log(a.fuels[0]);
      if (a.fuels[0].price < b.fuels[0].price) {
        return -1;
      }
      if (a.fuels[0].price > b.fuels[0].price) {
        return 1;
      }
      return 0;
    });

    return stations.slice(0, 5);
  }
}
