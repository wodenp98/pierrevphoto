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
    console.log("Error in postData", { url, data, res });

    throw Error(res.statusText);
  }

  return res.json();
};

export const deleteUserAccount = async ({
  url,
  data,
}: {
  url: string;
  data: string;
}) => {
  const res = await fetch(url, {
    method: "DELETE",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    console.log("Error in postData", { url, data, res });

    throw Error(res.statusText);
  }

  return res;
};

export const getData = async ({ url }: { url: string }) => {
  const res = await fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
  });

  if (!res.ok) {
    console.log("Error in getData", { url, res });

    throw Error(res.statusText);
  }

  return res.json();
};

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};
