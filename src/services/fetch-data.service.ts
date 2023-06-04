import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { FuelResponseData } from 'src/dto/fuel-response-data-api.dto';
import { Fuel } from 'src/dto/fuel.dto';
import { FuelService } from './fuel.service';
import { StationService } from './station.service';
import { StationDto, StationRawConvert } from '../dto/station.dto';
import { StationMapper } from 'src/mappers/station.mapper';
import { FuelMapper } from 'src/mappers/fuel.mapper';
import { FuelPriceMapper } from 'src/mappers/fuelPrice.mapper';
import { FuelPrice } from 'src/schemas/fuel-price.schema';

@Injectable()
export class FetchDataService {
  constructor(
    private readonly fuelService: FuelService,
    private readonly stationService: StationService,
    private readonly stationMapper: StationMapper,
    private readonly fuelMapper: FuelMapper,
    private readonly priceMapper: FuelPriceMapper,
    private readonly httpService: HttpService,
  ) {}

  async fetchFuelAndStationData(): Promise<any> {
    const fuelResponseData = await firstValueFrom(
      this.httpService.get<FuelResponseData>(
        //'https://precoscombustiveis.dgeg.gov.pt/api/PrecoComb/PesquisarPostos?idsTiposComb=2115%2C1143%2C1141%2C1142%2C1120%2C3400%2C3210%2C3205%2C3405%2C3201%2C2150%2C2155%2C2105%2C2101&idMarca=&idTipoPosto=&idDistrito=13&idsMunicipios=198&qtdPorPagina=500&pagina=1',
        'http://localhost:3001/gasonline',
        {
          headers: {
            accept: '*/*',
            'accept-language':
              'en-US,en;q=0.9,pt-PT;q=0.8,pt-BR;q=0.7,pt;q=0.6',
            'sec-ch-ua':
              '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Linux"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'x-requested-with': 'XMLHttpRequest',
          },
        },
      ),
    );

    const fuelResponse: FuelResponseData = fuelResponseData.data;
    const fuelsData: Fuel[] = [];
    const stationsIds: string[] = [];
    const stationsData: StationDto[] = [];
    const fuelsPricesData: FuelPrice[] = [];

    const stationsRaw = fuelResponse.resultado;

    for (const stationRaw of stationsRaw) {
      const stationConverted = new StationRawConvert(stationRaw);

      const fuels =
        this.fuelMapper.convertServerResponseToFuelList(stationConverted);

      const fuelsPrices =
        this.priceMapper.convertServerResponseToFuelPrice(stationConverted);

      const station =
        this.stationMapper.convertServerResponseToStationServiceDto(
          stationConverted,
        );

      for (const fuel of fuels) {
        fuelsData.push(fuel);
      }

      for (const fuelPrice of fuelsPrices) {
        fuelsPricesData.push(fuelPrice);
      }

      // console.log('station', station);
      // console.log(stationFuels);
      // console.log(fuelPrices);

      stationsData.push(station);
      // fuelsData.push(fuels);
      // fuelsPricesData.push(fuelsPrices);

      //this.stationService.createOrUpdateStation(stationConverted);

      // for (const stationFuel of stationFuels) {
      //   console.log(stationFuel);
      // }

      // if (!stationsIds.includes(fuelFromServer.Id)) {
      //   stationsIds.push(fuelFromServer.Id);
      //   const station =
      //     this.stationService.buildStationFromFuel(fuelFromServer);
      //   stationsData.push(station);
      // }
      // const id =
      //   fuelFromServer.Combustivel.replaceAll(' ', '_').toLowerCase() +
      //   '_' +
      //   fuelFromServer.Id;
      // const price = parseFloat(fuelFromServer.Preco.replace(',', '.'));
      // const fuel = new Fuel(
      //   id,
      //   fuelFromServer.Nome,
      //   fuelFromServer.Id,
      //   price,
      //   fuelFromServer.Combustivel,
      //   fuelFromServer.DataAtualizacao,
      //   fuelFromServer.Municipio,
      // );

      // fuels.push(fuel);
    }
    // this.fuelService.createOrUpdateFuels(fuels);

    await this.stationService.createOrUpdateStation(stationsData);
    console.log('CU')
    await this.fuelService.createOrUpdateFuel(fuelsData);
    await this.fuelService.createOrUpdateFuelPrice(fuelsPricesData);

    return this.stationService
      .createOrUpdateStation(stationsData)
      .then((response) => response);
  }
}
