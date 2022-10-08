export type MojeIDData = {
  address?: {
    country: string;
    formatted: string;
    locality: string;
    postal_code: string;
    street_address: string;
  }
  aud: string[];
  exp: number;
  iat: number;
  iss: string;
  nonce: string;
  sub: string;
};