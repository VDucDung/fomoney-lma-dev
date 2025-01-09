export function shortenWalletAddress(
  address: string,
  length: number = 4,
): string {
  if (address.length <= 2 * length) {
    return address; // If the address is too short, return it as is
  }
  const start = address.slice(0, length);
  const end = address.slice(-length);
  return `${start}...${end}`;
}
