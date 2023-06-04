export class FuelResponseData {
  status: boolean;
  mensagem: string;
  resultado: StationRaw[];
}

export class StationRaw {
  id: number;
  nome: string;
  estado: string;
  dataRegistoPosto: string;
  nomeEntidade: string;
  marca: string;
  distrito: string;
  municipio: string;
  localidade: string;
  morada: string;
  codPostal: string;
  sentido: string;
  latitude: number;
  longitude: number;
  utilizacao: string;
  tipoPosto: string;
  observacoes: string;
  horarioDiasUteis: string;
  horarioAberturaDiasUteis: string;
  horarioFechoDiasUteis: string;
  horarioSabados: string;
  horarioAberturaSabados: string;
  horarioFechoSabados: string;
  horarioDomingos: string;
  horarioAberturaDomingos: string;
  horarioFechoDomingos: string;
  horarioFeriados: string;
  horarioAberturaFeriados: string;
  horarioFechoFeriados: string;
  servicos: Services[];
  precosCombustiveis: FuelRaw[];
}

export class FuelRaw {
  idTipoCombustivel: number;
  preco: number;
  dataAtualizacao: string;
  tipoCombustivel: string;
}

export class Services {
  descritivo: string;
}

export class FuelData {
  Id: string;
  Nome: string;
  TipoPosto: string;
  Municipio: string;
  Preco: string;
  Marca: string;
  Combustivel: string;
  DataAtualizacao: string;
  Distrito: string;
  Morada: string;
  Localidade: string;
  CodPostal: string;
  Latitude: number;
  Longitude: number;
  Quantidade: number;
}