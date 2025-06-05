
import { getYear, getMonth } from './date';
import { CUF, getCUFByCode } from './cUF';
import { Mod, mods } from './mod';
import { getTpEmisByCode, TpEmis } from './tpEmis';
import { generateDV } from './dv';
import { validateAccessKey } from './validate-access-key';

export class AccessKey {
	private _dv: string = ''

	constructor(
		private _cUF: CUF,
		private _cnpj: string,
		private _mod: Mod,
		private _serie: string,
		private _nNF: string,
		private _tpEmis: TpEmis,
		private _cNF: string,
		private _year?: string,
		private _month?: string
	) {
		this._year = getYear(this._year);
		this._month = getMonth(this._month);
	}

	get cUF(): CUF { return this._cUF; }
	get year(): string { return this._year!; }
	get month(): string { return this._month!; }
	get cnpj(): string { return this._cnpj; }
	get mod(): Mod { return this._mod; }
	get serie(): string { return this._serie; }
	get nNF(): string { return this._nNF; }
	get tpEmis(): TpEmis { return this._tpEmis; }
	get cNF(): string { return this._cNF; }
	get dv(): string {
		if (!this._dv.length) {
			this._dv = generateDV(this.withoutDV());
		}
		return this._dv;
	}
	private withoutDV(): string {
		return `${this.cUF.code}${this.year}${this.month}${this.cnpj}${this.mod.code}${this.serie}${this.nNF}${this.tpEmis.code}${this.cNF}`;
	}

	toString(): string {
		return `${this.withoutDV()}${this.dv}`;
	}

	static clear(ak: string): string {
		return ak.replace(/[^0-9]/g, '');
	}
	static validate(ak: string): boolean {
		return validateAccessKey(ak);
	}

	static prettify(ak: string): string {
		// 0000-0000-0000 ...
		return ak.replace(/(.{4})/g, '$1-').slice(0, -1);
	}

	static fromString(accessKey: string): AccessKey {

		const cleanAK = AccessKey.clear(accessKey);

		if (cleanAK.length !== 44) {
			throw new Error("Invalid access key");
		}

		if (!validateAccessKey(cleanAK)) {
			throw new Error("Invalid access key");
		}

		const cufCode = cleanAK.substring(0, 2);
		const year = cleanAK.substring(2, 4);
		const month = cleanAK.substring(4, 6);
		const cnpj = cleanAK.substring(6, 14);
		const modCode = cleanAK.substring(14, 15);
		const serie = cleanAK.substring(15, 17);
		const nNF = cleanAK.substring(17, 21);
		const tpEmisCode = cleanAK.substring(21, 22);
		const cNF = cleanAK.substring(22, 31);

		const cuf = getCUFByCode(Number(cufCode));
		const mod = mods.find(mod => mod.code === Number(modCode));
		const tpEmis = getTpEmisByCode(Number(tpEmisCode));

		if (!cuf || !mod || !tpEmis) {
			throw new Error("Invalid access key");
		}

		return new AccessKey(cuf, cnpj, mod, serie, nNF, tpEmis, cNF, year, month);
	}
}
