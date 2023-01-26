export interface iCovid {
  date: number | string;
  states: number;
  positive: number;
  negative: number;
  pending: number;
  hospitalizedCurrently: number;
  hospitalizedCumulative: number;
  inIcuCurrently: number;
  inIcuCumulative: number;
  onVentilatorCurrently: number;
  onVentilatorCumulative: number;
  dateChecked: Date;
  death: number;
  hospitalized: number;
  totalTestResults: number;
  lastModified: Date;
  recovered: number | null;
  total: number;
  posNeg: number;
  deathIncrease: number;
  hospitalizedIncrease: number;
  negativeIncrease: number;
  positiveIncrease: number;
  totalTestResultsIncrease: number;
  hash: string;
}

export interface iCovidState {
  isLoading: boolean;
  stats: iCovid[];
  error: string | null | undefined;
}

export interface iCovidStateData {
  covid: iCovidState;
}
