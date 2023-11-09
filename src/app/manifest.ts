import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pierre.V Photographie",
    short_name: "Pierre.V",
    description: "Site de photographie par Pierre V.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/logo blanc.png",
        sizes: "<generated>",
        type: "image/png",
      },
    ],
  };
}
