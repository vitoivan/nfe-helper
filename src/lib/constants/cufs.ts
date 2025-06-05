import { UFCodes } from "../enums/UFCodes.enum"

type cUF = {
  code: UFCodes
  name: string
}

export const cufs: cUF[] = [
  { code: UFCodes.ACRE, name: "Acre" },
  { code: UFCodes.ALAGOAS, name: "Alagoas" },
  { code: UFCodes.BAHIA, name: "Bahia" },
  { code: UFCodes.CEARA, name: "Ceará" },
  { code: UFCodes.DISTRITO_FEDERAL, name: "Distrito Federal" },
  { code: UFCodes.ESPIRITO_SANTO, name: "Espírito Santo" },
  { code: UFCodes.GOIAS, name: "Goiás" },
  { code: UFCodes.AMAPA, name: "Amapá" },
  { code: UFCodes.AMAZONAS, name: "Amazonas" },
  { code: UFCodes.MARANHAO, name: "Maranhão" },
  { code: UFCodes.MATO_GROSSO_DO_SUL, name: "Mato Grosso do Sul" },
  { code: UFCodes.MATO_GROSSO, name: "Mato Grosso" },
  { code: UFCodes.MINAS_GERAIS, name: "Minas Gerais" },
  { code: UFCodes.PARA, name: "Pará" },
  { code: UFCodes.PARAIBA, name: "Paraíba" },
  { code: UFCodes.PARANA, name: "Paraná" },
  { code: UFCodes.PIAUI, name: "Piauí" },
  { code: UFCodes.RIO_DE_JANEIRO, name: "Rio de Janeiro" },
  { code: UFCodes.RIO_GRANDE_DO_NORTE, name: "Rio Grande do Norte" },
  { code: UFCodes.RIO_GRANDE_DO_SUL, name: "Rio Grande do Sul" },
  { code: UFCodes.RONDONIA, name: "Rondônia" },
  { code: UFCodes.RORAIMA, name: "Roraima" },
  { code: UFCodes.SANTA_CATARINA, name: "Santa Catarina" },
  { code: UFCodes.PERNAMBUCO, name: "Pernambuco" },
  { code: UFCodes.SERGIPE, name: "Sergipe" },
  { code: UFCodes.SAO_PAULO, name: "São Paulo" },
  { code: UFCodes.TOCANTINS, name: "Tocantins" },
];

export class CUFUtils {
  static getByCode(code: UFCodes) {
    return cufs.find(cuf => cuf.code === code)!;
  }
}
