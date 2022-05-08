export interface Pokemon {
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
}
