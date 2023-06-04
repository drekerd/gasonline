export class Fuel {
  externalId: number;
  typeOfFuel: string;

  constructor(externalId: number, typeOfFuel: string) {
    this.externalId = externalId;
    this.typeOfFuel = typeOfFuel;
  }
}
