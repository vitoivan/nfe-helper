import { generateDV } from "./dv";

export function validateAccessKey(accessKey: string): boolean {
  if (accessKey.length !== 44) return false;
  const withoutDV = accessKey.slice(0, accessKey.length - 1);
  const generatedDV = generateDV(withoutDV)
  // console.log({ generatedDV, originalDV: accessKey[accessKey.length - 1], originalKey: accessKey, keyWithoutDV: withoutDV });
  return generatedDV === accessKey[43];
}
