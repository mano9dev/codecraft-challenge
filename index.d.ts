export interface Player {
  name: string;
  ticket: number;
}

export interface Winner extends Player {
  amount: number;
}
