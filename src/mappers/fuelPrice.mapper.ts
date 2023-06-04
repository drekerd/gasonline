import { Injectable } from '@nestjs/common';
import { StationRaw } from 'src/dto/fuel-response-data-api.dto';
import { StationRawConvert } from 'src/dto/station.dto';
import { FuelPrice } from 'src/schemas/fuel-price.schema';

Injectable();
export class FuelPriceMapper {
  convertServerResponseToFuelPrice(station: StationRawConvert) {
    const prices = [];
    const { fuels } = station;

    if (!fuels) {
      return [];
    }

    for (const fuel of fuels) {
      const fuelPrice = new FuelPrice();
      fuelPrice.stationExternalId = station.externalId;
      fuelPrice.fuelExternalId = fuel.fuelId;
      fuelPrice.price = fuel.price;
      fuelPrice.date = fuel.lastUpdated;
      prices.push(fuelPrice);
    }
    return prices;
  }
}
