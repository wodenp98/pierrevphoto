export type OrdersProps = {
  id: string;
  userId: string;
  articleId: number;
  orderedAt: Date;
  totalPrice: number;
  description: string;
  status: string;
  articles: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
  };
};
