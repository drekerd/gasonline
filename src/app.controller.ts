import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { FuelService } from './services/fuel.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly fuelService: FuelService,
  ) {}

  @Get()
  getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Post()
  updateFuelDatabase(): Promise<any> {
    return this.fuelService.createFuel();
  }

  @Get('fuel/:id')
  findFuelById(@Param('id') id: string): Promise<any> {
    return this.fuelService.findById(id);
  }
}
