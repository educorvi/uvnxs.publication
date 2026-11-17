export function includesAny<T>(from: T[], includedIn: T[]): boolean {
  return includedIn.some(included => from.includes(included));
}
