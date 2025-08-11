import axios from "axios";
import { headers } from "next/headers";

const buildClient = async () => {
  const headersList = await headers();
  const incoming = Object.fromEntries(headersList.entries());

  const baseURL = process.env.NEXT_BASE_URL;

  return axios.create({
    baseURL,
    headers: {
      ...incoming,
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      Pragma: "no-cache",
    },
  });
};

export { buildClient };
