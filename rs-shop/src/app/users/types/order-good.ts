export interface IOrderGood {
  items: IItemsOrder[];
  details: {
    name: string;
    address: string;
    phone: string;
    timeToDeliver: string;
    comment: string;
  };
}

export interface IItemsOrder {
  id: string;
  amount: number;
}
