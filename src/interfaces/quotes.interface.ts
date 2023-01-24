export interface iQuote {
  _id: string;
  dateAdded: string;
  author: string;
  content: string;
}

export interface iQuoteState {
  isLoading: boolean;
  quotes: iQuote[];
  error: string | null | undefined;
  totalPages: number;
}

export interface iQuoteStateData {
  quotes: iQuoteState;
}

export interface iQuotePayload {
  results: iQuote[];
  totalPages: number;
}
