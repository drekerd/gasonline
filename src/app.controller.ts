import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FetchDataService } from './services/fetch-data.service';
import { FuelService } from './services/fuel.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import * as console from 'console';
import { Public } from './decorators/auth.decortor';
import { StationService } from './services/station.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly fetchDataService: FetchDataService,
    private readonly fuelService: FuelService,
    private readonly stationService: StationService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getHello(@Req() request): Promise<string> {
    console.log(request.user);
    return this.appService.getHello();
  }

  @Public()
  @Post()
  fetchData(): Promise<any> {
    return this.fetchDataService.fetchFuelAndStationData();
  }

  @Get('/fuel/city/')
  async findCheapestFuelByCity(
    @Query('city') city: string,
    @Query('type') type: string,
  ): Promise<any> {
    console.log('controller', city);
    return await this.stationService.findStationByCheapestFuelByCity(
      city,
      type,
    );
  }

  @Get('fuel/:id')
  findFuelById(@Param('id') id: number): Promise<any> {
    return this.fuelService.findById(id);
  }

  @Public()
  @Get('/station/')
  async getStationById(@Query('externalId') externalId: string): Promise<any> {
    // This looks ridiculous, but javascript thinks it is a number, however the type is still string.
    const ids = externalId.split(',');
    const parsedIds = ids.map((id) => {
      return parseInt(id);
    });

    return this.stationService.findStationByExternalId(parsedIds);
  }
}
