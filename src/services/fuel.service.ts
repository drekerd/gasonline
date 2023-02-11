import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { FuelDto, FuelRepository } from 'src/repositories/fuel.respository';

export class Fuel {
  id: string;
  name: string;
  stationId: number;
  price: number;
  fuel: string;
  lastUpdated: Date;
  city: string;
}

export class FuelResult {
  status: boolean;
  mensagem: string;
  resultado: [];
}

@Injectable()
export class FuelService {
  constructor(
    private readonly fuelRepository: FuelRepository,
    private readonly httpService: HttpService,
  ) {}

  async createFuel(): Promise<any> {
    const fuelResponse = await firstValueFrom(
      this.httpService.get(
        'https://precoscombustiveis.dgeg.gov.pt/api/PrecoComb/PesquisarPostos?idsTiposComb=2115%2C1143%2C1141%2C1142%2C1120%2C3400%2C3210%2C3205%2C3405%2C3201%2C2150%2C2155%2C2105%2C2101&idMarca=&idTipoPosto=&idDistrito=13&idsMunicipios=198&qtdPorPagina=500&pagina=1',
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

    const result = fuelResponse.data.resultado;

    for (const fuel of result) {
      const fuelDto = new FuelDto();
      fuelDto.id = fuel.Nome + '_' + fuel.Combustivel;
      fuelDto.name = fuel.Nome;
      fuelDto.stationId = fuel.Id;
      fuelDto.price = parseFloat(fuel.Preco.replace(',', '.'));
      fuelDto.fuel = fuel.Combustivel;
      fuelDto.lastUpdated = fuel.DataAtualizacao;
      fuelDto.city = fuel.Municipio;

      // this.fuelRepository.

      this.fuelRepository.createFuel(fuelDto);
    }

    return Promise.resolve(true);
  }

  findById(id:string){
    this.fuelRepository.getFuelById(id)
  }
}
