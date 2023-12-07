interface Item {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  aspectRatio: string;
  price: number;
  format: string;
  rendu: string;
  impression: string;
}

export const postData = async ({
  url,
  data,
}: {
  url: string;
  data?: Item[];
}) => {
  const res = await fetch(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw Error(res.statusText);
  }

  return res.json();
};
