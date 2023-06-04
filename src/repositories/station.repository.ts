import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fuel, FuelDocument } from 'src/schemas/fuel.schema';
import { Station, StationDocument } from '../schemas/station.schema';
import { StationDto } from '../dto/station.dto';
import * as console from 'console';
import { FuelService } from 'src/services/fuel.service';

@Injectable()
export class StationRepository {
  constructor(
    @InjectModel(Station.name) private stationModel: Model<Station>,
    private fuelService: FuelService,
  ) {}

  createStation(station: Station): Promise<any> {
    const newStation = new this.stationModel({
      externalId: station.externalId,
      name: station.name,
      status: station.status,
      registryDate: station.registryDate,
      entityName: station.entityName,
      brand: station.brand,
      district: station.district,
      city: station.city,
      address: station.address,
      parish: station.parish,
      postalCode: station.postalCode,
      latitude: station.latitude,
      longitude: station.longitude,
      use: station.use,
      type: station.type,
      observations: station.observations,
      weekDaysSchedule: station.weekDaysSchedule,
      weekDaysOpeningHours: station.weekDaysOpeningHours,
      weekDaysClosingHours: station.weekDaysClosingHours,
      saturdaySchedule: station.saturdaySchedule,
      saturdayOpeningHours: station.saturdayOpeningHours,
      saturdayClosingHours: station.saturdayClosingHours,
      sundaySchedule: station.sundaySchedule,
      sundayOpeningHours: station.sundayOpeningHours,
      sundayClosingHours: station.sundayClosingHours,
      holidaySchedule: station.holidaySchedule,
      holidayOpeningHours: station.holidayOpeningHours,
      holidayClosingHours: station.holidayClosingHours,
      fuels: station.fuels,
    });

    return newStation.save();
  }

  getStationById(externalId: number): Promise<Station> {
    return this.stationModel
      .findOne({ externalId: externalId })
      .exec()
      .then((station) => station);
  }

  async updateStation(station: Station): Promise<any> {
    return this.stationModel.updateOne<StationDocument>(
      { externalId: station.externalId },
      {
        $set: {
          externalId: station.externalId,
          name: station.name,
          status: station.status,
          registryDate: station.registryDate,
          entityName: station.entityName,
          brand: station.brand,
          district: station.district,
          city: station.city,
          address: station.address,
          parish: station.parish,
          postalCode: station.postalCode,
          latitude: station.latitude,
          longitude: station.longitude,
          use: station.use,
          type: station.type,
          observations: station.observations,
          weekDaysSchedule: station.weekDaysSchedule,
          weekDaysOpeningHours: station.weekDaysOpeningHours,
          weekDaysClosingHours: station.weekDaysClosingHours,
          saturdaySchedule: station.saturdaySchedule,
          saturdayOpeningHours: station.saturdayOpeningHours,
          saturdayClosingHours: station.saturdayClosingHours,
          sundaySchedule: station.sundaySchedule,
          sundayOpeningHours: station.sundayOpeningHours,
          sundayClosingHours: station.sundayClosingHours,
          holidaySchedule: station.holidaySchedule,
          holidayOpeningHours: station.holidayOpeningHours,
          holidayClosingHours: station.holidayClosingHours,
          fuels: station.fuels,
        },
      },
      { upsert: true },
    );
  }

  async findStationByExternalId(
    stationExternalId: number | number[],
    filters?: Map<string, string>,
  ) {
    let matchCondition = {};

    if (typeof stationExternalId === 'number') {
      matchCondition = { externalId: stationExternalId };
    } else {
      matchCondition = { externalId: { $in: stationExternalId } };
    }

    const filter = {};
    if (filters) {
      const filtersArray = Array.from(filters)[0];
      let filterBy = '';
      let filterValue = '';

      filterBy = filtersArray[0];
      filterValue = filtersArray[1];
      filter[filterBy] = filterValue;
    }

    return this.stationModel.aggregate([
      { $match: matchCondition },
      // Then, lookup the fuels that match the station's fuels array
      {
        $lookup: {
          from: 'fuels',
          localField: 'fuels',
          foreignField: 'externalId',
          pipeline: [{ $match: filter }],
          as: 'matched_fuels',
        },
      },
      // Unwind the matched_fuels array
      { $unwind: '$matched_fuels' },

      // Lookup the prices that match the station and the fuel
      // Lookup the prices that match the station and fuel IDs
      {
        $lookup: {
          from: 'fuelprices',
          let: {
            stationId: '$externalId',
            fuelId: '$matched_fuels.externalId',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$stationExternalId', '$$stationId'] },
                    { $eq: ['$fuelExternalId', '$$fuelId'] },
                  ],
                },
              },
            },
            { $sort: { date: -1 } },
            { $limit: 2 },
          ],
          as: 'matched_prices',
        },
      },
      // Group the results by station and fuel, and push the matched prices into the fuel object
      {
        $group: {
          _id: {
            station: '$externalId',
            fuel: '$matched_fuels.externalId',
            fuelName: '$matched_fuels.typeOfFuel',
          },
          stationDoc: { $first: '$$ROOT' },
          price: { $push: { $arrayElemAt: ['$matched_prices.price', 0] } },
          date: { $push: { $arrayElemAt: ['$matched_prices.date', 0] } },
        },
      },
      // Group the results again to combine the price and date arrays
      {
        $group: {
          _id: '$_id.station',
          stationDoc: { $first: '$stationDoc' },
          fuels: {
            $push: {
              name: '$_id.fuelName',
              externalId: '$_id.fuel',
              price: { $arrayElemAt: ['$price', 0] },
              date: { $arrayElemAt: ['$date', 0] },
            },
          },
        },
      },
      {
        $project: {
          _id: '$stationDoc._id',
          externalId: '$stationDoc.externalId',
          name: '$stationDoc.name',
          city: '$stationDoc.city',
          parish: '$stationDoc.parish',
          address: '$stationDoc.address',
          postalCode: '$stationDoc.postalCode',
          brand: '$stationDoc.brand',
          weekDaysSchedule: '$stationDoc.weekDaysSchedule',
          weekDaysOpeningHours: '$stationDoc.weekDaysOpeningHours',
          weekDaysClosingHours: '$stationDoc.weekDaysClosingHours',
          saturdaySchedule: '$stationDoc.saturdaySchedule',
          saturdayOpeningHours: '$stationDoc.saturdayOpeningHours',
          saturdayClosingHours: '$stationDoc.saturdayClosingHours',
          sundaySchedule: '$stationDoc.sundaySchedule',
          sundayOpeningHours: '$stationDoc.sundayOpeningHours',
          sundayClosingHours: '$stationDoc.sundayClosingHours',
          holidaySchedule: '$stationDoc.holidaySchedule',
          holidayOpeningHours: '$stationDoc.holidayOpeningHours',
          holidayClosingHours: '$stationDoc.holidayClosingHours',
          //stationDoc:'$stationDoc',
          fuels: {
            $map: {
              input: '$fuels',
              as: 'fuel',
              in: {
                name: '$$fuel.name',
                externalId: '$$fuel.externalId',
                price: '$$fuel.price',
                date: '$$fuel.date',
              },
            },
          },
        },
      },
    ]);
  }

  async findStationByCity(city: string, type: string) {
    const stations = await this.stationModel
      .aggregate([
        { $match: { city: city } },
        {
          $lookup: {
            from: 'fuels',
            localField: 'fuels',
            foreignField: 'externalId',
            as: 'fuels',
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ['$typeOfFuel', type] }],
                  },
                },
              },
            ],
          },
        },
      ])
      .exec();

    const stationsToReturn = [];
    for (const station in stations) {
      console.log(stations[station].externalId);
      if (stations[station].externalId == 80841) {
        debugger;
      }
      if (stations[station].fuels.length === 0) {
        continue;
      }
      for (const fuel in stations[station].fuels) {
        const fuelPrice =
          await this.fuelService.getFuelPricesByFuelAndStationExternalId(
            stations[station].externalId,
            stations[station].fuels[fuel].externalId,
          );

        const { date, price } = fuelPrice[0];
        stations[station].fuels[fuel].price = { price: price, date: date };
      }
      stationsToReturn.push(stations[station]);
    }
    return stationsToReturn;
  }
}
