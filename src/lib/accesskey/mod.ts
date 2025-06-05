export type Mod = {
	code: number;
	name: string;
	isDefault: boolean;
}

export const mods: Mod[] = [
  {
    code: 55,
    name: 'NFE',
    isDefault: true
  },
  {
    code: 58,
    name: 'SAT',
    isDefault: false
  },
  {
    code: 59,
    name: 'SAT',
    isDefault: false
  },
  {
    code: 60,
    name: 'ECF',
    isDefault: false
  },
  {
    code: 65,
    name: 'NFCE',
    isDefault: false
  }
];

export function getModByCode(code: number): Mod | undefined {
  return mods.find(mod => mod.code === code);
}

export function getModByName(name: string): Mod | undefined {
  return mods.find(mod => mod.name === name);
}

