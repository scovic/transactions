

export function isNumber(value: string) {
  const pattern = /^\d*\.?\d*$/
  return pattern.test(value);
}