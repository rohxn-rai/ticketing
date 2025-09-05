import { headers } from "next/headers";
import axios from "axios";

const buildClient = async () => {
  const headersList = await headers();

  const baseURL = process.env.NEXT_BASE_URL

  return axios.create({
    baseURL,
    headers: headersList,
  });
};

export { buildClient}