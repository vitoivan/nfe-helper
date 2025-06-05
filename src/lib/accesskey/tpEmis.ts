export type TpEmisParams = {
	code: number;
	name: string;
	description: string;
};

export class TpEmis {
  constructor(
		private _params: TpEmisParams
  ) { }

  get code(): number {
    return this._params.code
  }

  set code(value: number) {
    this._params.code = value
  }

  get name(): string {
    return this._params.name
  }

  set name(value: string) {
    this._params.name = value
  }

  get description(): string {
    return this._params.description
  }

  set description(value: string) {
    this._params.description = value
  }
}

export const tpEmisList: TpEmis[] = [
  new TpEmis({
    code: 1,
    name: 'Normal',
    description: 'Emissão normal'
  }),
  new TpEmis({
    code: 2,
    name: 'Contingência FS (Formulário Segurança)',
    description: 'Quando o sistema está offline e usa papel com segurança'
  }),
  new TpEmis({
    code: 3,
    name: 'Contingência SCAN (descontinuado)',
    description: 'Era usado em caso de indisponibilidade da SEFAZ'
  }),
  new TpEmis({
    code: 4,
    name: 'Contingência DPEC (descontinuado)',
    description: 'Envio de evento antes da nota (não é mais usado)'
  }),
  new TpEmis({
    code: 5,
    name: 'Contingência FS-DA',
    description: 'Similar ao FS, mas com Documento Auxiliar'
  }),
  new TpEmis({
    code: 6,
    name: 'Contingência SVC-AN',
    description: 'SEFAZ Virtual de Contingência (ambiente nacional)'
  }),
  new TpEmis({
    code: 7,
    name: 'Contingência SVC-RS',
    description: 'SEFAZ Virtual de Contingência (Rio Grande do Sul)'
  }),
  new TpEmis({
    code: 9,
    name: 'Contingência Off-line da NFC-e',
    description: 'Usado em NFC-e quando o PDV está sem internet (ex: mercado sem sinal)'
  }),
];

export function getTpEmisByCode(code: number): TpEmis | undefined {
  return tpEmisList.find(tp => tp.code === code);
}
