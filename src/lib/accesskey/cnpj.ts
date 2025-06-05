const onlyIntRegex = /[^0-9]+/g;
const baseWeights = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];

function generateRandomDigit(): number {
  return Math.floor(Math.random() * 9);
}

function sumOfProducts(numbers: number[], weights: number[]): number {
  return numbers.reduce((acc, num, i) => acc + num * weights[i], 0);
}

function reverse<T>(array: T[]): T[] {
  return [...array].reverse();
}

export function clearCNPJ(cnpj: string): string {
  return cnpj.replace(onlyIntRegex, '');
}

export function prettifyCNPJ(cnpj: string): string {
  return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12, 14)}`;
}

export function generateCNPJ(): string {
  const numbers: number[] = Array.from({ length: 8 }, generateRandomDigit).concat([0, 0, 0, 1]);

  let weights = reverse(baseWeights);
  const sum1 = sumOfProducts(numbers, weights);
  let dv1 = 11 - (sum1 % 11);
  if (dv1 > 9) dv1 = 0;
  numbers.push(dv1);

  weights = reverse([...baseWeights, 6]);
  const sum2 = sumOfProducts(numbers, weights);
  let dv2 = 11 - (sum2 % 11);
  if (dv2 > 9) dv2 = 0;
  numbers.push(dv2);

  return numbers.join('');
}

export function validateCNPJ(raw: string): boolean {
  const cnpj = clearCNPJ(raw);
  if (cnpj.length !== 14) return false;

  const digits = cnpj.slice(0, 12).split('').map(Number);
  const expectedDV1 = 11 - (sumOfProducts(digits, reverse(baseWeights)) % 11);
  const dv1 = expectedDV1 > 9 ? 0 : expectedDV1;

  if (dv1 !== Number(cnpj[12])) return false;

  digits.push(dv1);
  const expectedDV2 = 11 - (sumOfProducts(digits, reverse([...baseWeights, 6])) % 11);
  const dv2 = expectedDV2 > 9 ? 0 : expectedDV2;

  return dv2 === Number(cnpj[13]);
}
