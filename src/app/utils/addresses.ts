export function shortenAddress(address: string, capitalize?: boolean) {
  const shortened =
    address.substring(0, 5) + '...' + address.substring(address.length - 4);
  return shortened;
}
