interface IMenu {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  isAvailable: boolean;
}

interface ICart {
  menuId?: string;
  quantity: number;
  notes?: string;
  menuItem?: IMenu;
  name?: string;
}

interface IOrder {
  id: string;
  customer_name: string;
  table_number: number;
  cart: ICart[];
  status: "PENDING" | "PROCESSING" | "COMPLETED";
  total: number;
}

export type { IOrder, ICart, IMenu };
