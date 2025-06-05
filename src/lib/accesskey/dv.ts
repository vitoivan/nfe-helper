export function generateDV(accessKey43: string): string {

  if (accessKey43.length !== 43) {
    throw new Error("Invalid access key");
  }

  const weights = [2, 3, 4, 5, 6, 7, 8, 9];
  let sum = 0;

  for (let i = 0; i < 43; i++) {
    const digit = Number(accessKey43.charAt(42 - i));
    const weight = weights[i % weights.length];
    sum += digit * weight;
  }

  const remainder = sum % 11;
  const dv = remainder === 0 || remainder === 1 ? 0 : 11 - remainder;

  return String(dv);
}
