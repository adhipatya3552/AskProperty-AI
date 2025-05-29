export interface PropertyMatch {
  location: string;
  size: number;
  price: string;
  seller: string;
  contact: string;
}

export interface ChatRequestParams {
  message?: string;
  city?: string;
  landSize?: number;
  budget?: number;
}