export interface ICat {
  breeds: IBreed[];
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface IBreed {
  weight: Weight;
  id: string;
  name: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  life_span: string;
  wikipedia_url: string;
  description?: string;
}

export interface Weight {
  imperial: string;
  metric: string;
}

export interface ICategory {
  id: number;
  name: string;
}
