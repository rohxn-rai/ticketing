import axios from "axios";
import { headers } from "next/headers";

const buildClient = async () => {
  const headersList = await headers();

  const baseURL = process.env.NEXT_BASE_URL;

  return axios.create({
    baseURL,
    headers: headersList,
  });
};

export { buildClient };
