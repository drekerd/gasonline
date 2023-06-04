import { Injectable } from '@nestjs/common';
import StationBuilder from 'src/builders/station.builder';
import { StationRaw } from 'src/dto/fuel-response-data-api.dto';
import { StationDto, StationRawConvert } from 'src/dto/station.dto';

@Injectable()
export class StationMapper {
  private buildStation(station: StationRawConvert): StationDto {
    return new StationBuilder()
      .setExternalId(station.externalId)
      .setName(station.name)
      .setStatus(station.status)
      .setRegistryDate(station.registryDate)
      .setEntityName(station.entityName)
      .setBrand(station.brand)
      .setDistrict(station.district)
      .setCity(station.city)
      .setParish(station.parish)
      .setAddress(station.address)
      .setPostalCode(station.postalCode)
      .setOrientation(station.orientation)
      .setLatitude(station.latitude)
      .setLongitude(station.longitude)
      .setUtilization(station.use)
      .setType(station.type)
      .setObservation(station.observations)
      .setWeekDaysSchedule(station.weekDaysSchedule)
      .setWeekDaysOpeningHours(station.weekDaysOpeningHours)
      .setWeekDaysClosingHours(station.weekDaysClosingHours)
      .setSaturdaySchedule(station.saturdaySchedule)
      .setSaturdayOpeningHours(station.saturdayOpeningHours)
      .setSaturdayClosingHours(station.saturdayClosingHours)
      .setSundaySchedule(station.sundaySchedule)
      .setSundayOpeningHours(station.sundayOpeningHours)
      .setSundayClosingHours(station.sundayClosingHours)
      .setHolidaySchedule(station.holidaySchedule)
      .setHolidayOpeningHours(station.holidayOpeningHours)
      .setHolidayClosingHours(station.holidayClosingHours)
      .setFuels(station.fuels)
      .build();
  }

  // Need to decouple fuels from this method
  convertServerResponseToStationServiceDto(
    stationConverted: StationRawConvert,
  ): StationDto {
    return this.buildStation(stationConverted);
  }
}
