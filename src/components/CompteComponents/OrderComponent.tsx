import Image from "next/image";

type OrdersProps = {
  id: string;
  userId: string;
  articleId: number;
  orderedAt: string;
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

export default function CardHistoryItem({
  historyCommand,
}: {
  historyCommand: OrdersProps;
}) {
  const date = new Date(historyCommand.orderedAt).toLocaleDateString("fr-FR");

  return (
    <div key={historyCommand.id} className="mb-6">
      <p className="font-bold text-sm">Le {date}</p>
      <div className="flex mt-5 w-full">
        <div className="flex-shrink-0">
          <Image
            key={historyCommand.articles.id}
            src={historyCommand.articles.imageUrl}
            alt={historyCommand.articles.name}
            width={325}
            height={325}
            className="object-cover w-28 h-28 sm:w-36 sm:h-36"
          />
        </div>
        <div className="flex-grow ml-4">
          <p className="text-xl font-bold">{historyCommand.articles.name}</p>
          <p>{historyCommand.description}</p>
        </div>
        <div className="flex flex-col items-end justify-between ml-4">
          <span className="text-lg">{historyCommand.totalPrice / 100} €</span>
        </div>
      </div>
    </div>
  );
}
