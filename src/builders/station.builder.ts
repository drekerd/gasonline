import { FuelRawConvert, StationDto } from '../dto/station.dto';

export default class StationBuilder {
  externalId: number;
  name: string;
  status: string;
  registryDate: string;
  entityName: string;
  brand: string;
  district: string;
  city: string;
  parish: string;
  address: string;
  postalCode: string;
  orientation: string;
  latitude: number;
  longitude: number;
  use: string;
  type: string;
  observations: string;
  weekDaysSchedule: string;
  weekDaysOpeningHours: string;
  weekDaysClosingHours: string;
  saturdaySchedule: string;
  saturdayOpeningHours: string;
  saturdayClosingHours: string;
  sundaySchedule: string;
  sundayOpeningHours: string;
  sundayClosingHours: string;
  holidaySchedule: string;
  holidayOpeningHours: string;
  holidayClosingHours: string;
  fuels: number[];

  setExternalId(externalId: number) {
    this.externalId = externalId;
    return this;
  }

  setName(name: string) {
    this.name = name;
    return this;
  }

  setStatus(status: string) {
    this.status = status;
    return this;
  }

  setRegistryDate(registryDate: string) {
    this.registryDate = registryDate;
    return this;
  }

  setEntityName(entityName: string) {
    this.entityName = entityName;
    return this;
  }

  setBrand(brand: string) {
    this.brand = brand;
    return this;
  }

  setDistrict(district: string) {
    this.district = district;
    return this;
  }

  setCity(city: string) {
    this.city = city;
    return this;
  }

  setParish(parish: string) {
    this.parish = parish;
    return this;
  }

  setAddress(address: string) {
    this.address = address;
    return this;
  }

  setPostalCode(postalCode: string) {
    this.postalCode = postalCode;
    return this;
  }

  setOrientation(orientation: string) {
    this.orientation = orientation;
    return this;
  }

  setLatitude(latitude: number) {
    this.latitude = latitude;
    return this;
  }

  setLongitude(longitude: number) {
    this.longitude = longitude;
    return this;
  }

  setUtilization(use: string) {
    this.use = use;
    return this;
  }

  setType(type: string) {
    this.type = type;
    return this;
  }

  setObservation(observations: string) {
    this.observations = observations;
    return this;
  }

  setWeekDaysSchedule(weekDaysSchedule: string) {
    this.weekDaysSchedule = weekDaysSchedule;
    return this;
  }

  setWeekDaysOpeningHours(weekDaysOpeningHours: string) {
    this.weekDaysOpeningHours = weekDaysOpeningHours;
    return this;
  }

  setWeekDaysClosingHours(weekDaysClosingHours: string) {
    this.weekDaysClosingHours = weekDaysClosingHours;
    return this;
  }

  setSaturdaySchedule(saturdaySchedule: string) {
    this.saturdaySchedule = saturdaySchedule;
    return this;
  }

  setSaturdayOpeningHours(saturdayOpeningHours: string) {
    this.saturdayOpeningHours = saturdayOpeningHours;
    return this;
  }

  setSaturdayClosingHours(saturdayClosingHours: string) {
    this.saturdayClosingHours = saturdayClosingHours;
    return this;
  }

  setSundaySchedule(sundaySchedule: string) {
    this.sundaySchedule = sundaySchedule;
    return this;
  }

  setSundayOpeningHours(sundayOpeningHours: string) {
    this.sundayOpeningHours = sundayOpeningHours;
    return this;
  }

  setSundayClosingHours(sundayClosingHours: string) {
    this.sundayClosingHours = sundayClosingHours;
    return this;
  }

  setHolidaySchedule(holidaySchedule: string) {
    this.holidaySchedule = holidaySchedule;
    return this;
  }

  setHolidayOpeningHours(holidayOpeningHours: string) {
    this.holidayOpeningHours = holidayOpeningHours;
    return this;
  }

  setHolidayClosingHours(holidayClosingHours: string) {
    this.holidayClosingHours = holidayClosingHours;
    return this;
  }

  setFuels(fuels: FuelRawConvert[]) {
    this.fuels = fuels.map((fuel) => fuel.fuelId);
    return this;
  }

  build(): StationDto {
    return new StationDto(this);
  }
}
