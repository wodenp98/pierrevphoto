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
        src: "/assets/logo blanc.png",
        sizes: "36x36",
        type: "image/png",
      },
    ],
  };
}
