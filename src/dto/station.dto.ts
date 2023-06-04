import StationBuilder from '../builders/station.builder';
import { FuelRaw, StationRaw } from './fuel-response-data-api.dto';
import { Fuel } from './fuel.dto';

export class StationDto {
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

  constructor(stationBuilder: StationBuilder) {
    this.externalId = stationBuilder.externalId;
    this.name = stationBuilder.name;
    this.status = stationBuilder.status;
    this.registryDate = stationBuilder.registryDate;
    this.entityName = stationBuilder.entityName;
    this.brand = stationBuilder.brand;
    this.district = stationBuilder.district;
    this.city = stationBuilder.city;
    this.parish = stationBuilder.parish;
    this.address = stationBuilder.address;
    this.postalCode = stationBuilder.postalCode;
    this.orientation = stationBuilder.orientation;
    this.latitude = stationBuilder.latitude;
    this.longitude = stationBuilder.longitude;
    this.use = stationBuilder.use;
    this.type = stationBuilder.type;
    this.observations = stationBuilder.observations;
    this.weekDaysSchedule = stationBuilder.weekDaysSchedule;
    this.weekDaysOpeningHours = stationBuilder.weekDaysOpeningHours;
    this.weekDaysClosingHours = stationBuilder.weekDaysClosingHours;
    this.saturdaySchedule = stationBuilder.saturdaySchedule;
    this.saturdayOpeningHours = stationBuilder.saturdayOpeningHours;
    this.saturdayClosingHours = stationBuilder.saturdayClosingHours;
    this.sundaySchedule = stationBuilder.sundaySchedule;
    this.sundayOpeningHours = stationBuilder.sundayOpeningHours;
    this.sundayClosingHours = stationBuilder.sundayClosingHours;
    this.holidaySchedule = stationBuilder.holidaySchedule;
    this.holidayOpeningHours = stationBuilder.holidayOpeningHours;
    this.holidayClosingHours = stationBuilder.holidayClosingHours;
    this.fuels = stationBuilder.fuels;
  }
}
export class StationRawConvert {
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
  fuels: FuelRawConvert[];

  constructor(stationRaw: StationRaw) {
    this.externalId = stationRaw.id;
    this.name = stationRaw.nome;
    this.status = stationRaw.estado;
    this.registryDate = stationRaw.dataRegistoPosto;
    this.entityName = stationRaw.nomeEntidade;
    this.brand = stationRaw.marca;
    this.district = stationRaw.distrito;
    this.city = stationRaw.municipio;
    this.parish = stationRaw.localidade;
    this.address = stationRaw.morada;
    this.postalCode = stationRaw.codPostal;
    this.orientation = stationRaw.sentido;
    this.latitude = stationRaw.latitude;
    this.longitude = stationRaw.longitude;
    this.use = stationRaw.utilizacao;
    this.type = stationRaw.tipoPosto;
    this.observations = stationRaw.observacoes;
    this.weekDaysSchedule = stationRaw.horarioAberturaDiasUteis;
    this.weekDaysOpeningHours = stationRaw.horarioAberturaDiasUteis;
    this.weekDaysClosingHours = stationRaw.horarioFechoDiasUteis;
    this.saturdaySchedule = stationRaw.horarioSabados;
    this.saturdayOpeningHours = stationRaw.horarioAberturaSabados;
    this.saturdayClosingHours = stationRaw.horarioAberturaSabados;
    this.sundaySchedule = stationRaw.horarioDomingos;
    this.sundayOpeningHours = stationRaw.horarioAberturaDomingos;
    this.sundayClosingHours = stationRaw.horarioFechoDomingos;
    this.holidaySchedule = stationRaw.horarioFeriados;
    this.holidayOpeningHours = stationRaw.horarioAberturaFeriados;
    this.holidayClosingHours = stationRaw.horarioFechoFeriados;
    if (stationRaw.precosCombustiveis) {
      this.fuels = stationRaw.precosCombustiveis.map((comsbustivel) => {
        return new FuelRawConvert(
          comsbustivel.idTipoCombustivel,
          comsbustivel.preco,
          comsbustivel.dataAtualizacao,
          comsbustivel.tipoCombustivel,
        );
      });
    } else {
      this.fuels = [];
    }
  }
}

export class FuelRawConvert {
  fuelId: number;
  price: number;
  lastUpdated: string;
  fuelType: string;

  constructor(idTipoCombustivel, preco, dataAtualizacao, tipoCombustivel) {
    this.fuelId = idTipoCombustivel;
    this.price = preco;
    this.lastUpdated = dataAtualizacao;
    this.fuelType = tipoCombustivel;
  }

  idTipoCombustivel: number;
  preco: number;
  dataAtualizacao: string;
  tipoCombustivel: string;
}
