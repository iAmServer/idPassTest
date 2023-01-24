export interface iName {
  name: {
    first: string;
    last: string;
  };
  location: {
    city: string;
    state: string;
    country: string;
  };
  email: string;
  phone: string;
  gender: string;
  dob: {
    date: string;
  };
  picture: {
    medium: string;
  };
}

export interface iNameState {
  isLoading: boolean;
  data: iName;
  error: string | null | undefined;
}

export interface iNameStateData {
  names: iNameState;
}

export interface iNamesPayload {
  results: iName[];
}
