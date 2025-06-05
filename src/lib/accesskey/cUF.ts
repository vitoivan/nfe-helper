export type CUFParams = {
	code: number;
	name: string;
	uf: string;
	default?: boolean;
};

export class CUF {
  constructor(
		private _params: CUFParams
  ) { }

  get code(): number {
    return this._params.code;
  }

  set code(value: number) {
    this._params.code = value;
  }

  get name(): string {
    return this._params.name;
  }

  set name(value: string) {
    this._params.name = value;
  }

  get uf(): string {
    return this._params.uf;
  }

  set uf(value: string) {
    this._params.uf = value;
  }

  get isDefault(): boolean {
    return this._params.default || false;
  }

  set isDefault(value: boolean) {
    this._params.default = value;
  }
}

const cufList: CUF[] = [
  new CUF({
    code: 12,
    name: 'Acre',
    uf: 'AC',
  }),
  new CUF({
    code: 27,
    name: 'Alagoas',
    uf: 'AL',
  }),
  new CUF({
    code: 29,
    name: 'Bahia',
    uf: 'BA',
  }),
  new CUF({
    code: 23,
    name: 'Ceará',
    uf: 'CE',
  }),
  new CUF({
    code: 53,
    name: 'Distrito Federal',
    uf: 'DF',
  }),
  new CUF({
    code: 32,
    name: 'Espírito Santo',
    uf: 'ES',
  }),
  new CUF({
    code: 52,
    name: 'Goiás',
    uf: 'GO',
  }),
  new CUF({
    code: 16,
    name: 'Amapá',
    uf: 'AP',
  }),
  new CUF({
    code: 13,
    name: 'Amazonas',
    uf: 'AM',
  }),
  new CUF({
    code: 21,
    name: 'Maranhão',
    uf: 'MA',
  }),
  new CUF({
    code: 50,
    name: 'Mato Grosso do Sul',
    uf: 'MS',
  }),
  new CUF({
    code: 51,
    name: 'Mato Grosso',
    uf: 'MT',
  }),
  new CUF({
    code: 31,
    name: 'Minas Gerais',
    uf: 'MG',
  }),
  new CUF({
    code: 15,
    name: 'Pará',
    uf: 'PA',
  }),
  new CUF({
    code: 25,
    name: 'Paraíba',
    uf: 'PB',
  }),
  new CUF({
    code: 41,
    name: 'Paraná',
    uf: 'PR',
  }),
  new CUF({
    code: 22,
    name: 'Piauí',
    uf: 'PI',
  }),
  new CUF({
    code: 33,
    name: 'Rio de Janeiro',
    uf: 'RJ',
    default: true,
  }),
  new CUF({
    code: 24,
    name: 'Rio Grande do Norte',
    uf: 'RN',
  }),
  new CUF({
    code: 43,
    name: 'Rio Grande do Sul',
    uf: 'RS',
  }),
  new CUF({
    code: 11,
    name: 'Rondônia',
    uf: 'RO',
  }),
  new CUF({
    code: 14,
    name: 'Roraima',
    uf: 'RR',
  }),
  new CUF({
    code: 42,
    name: 'Santa Catarina',
    uf: 'SC',
  }),
  new CUF({
    code: 26,
    name: 'Pernambuco',
    uf: 'PE',
  }),
  new CUF({
    code: 28,
    name: 'Sergipe',
    uf: 'SE',
  }),
  new CUF({
    code: 35,
    name: 'São Paulo',
    uf: 'SP',
  }),
  new CUF({
    code: 17,
    name: 'Tocantins',
    uf: 'TO',
  })
];

export function getCUFByCode(code: number): CUF | undefined {
  return cufList.find(item => item.code === code);
}

export function getCUFByUF(uf: string): CUF | undefined {
  return cufList.find(item => item.uf === uf);
}
