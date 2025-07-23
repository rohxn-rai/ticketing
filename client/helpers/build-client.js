import axios from "axios";
import { headers } from "next/headers";

const buildClient = async () => {
  const headersList = await headers();

  const cookie = headersList.get("cookie");
  return axios.create({
    baseURL: process.env.NEXT_BASE_URL || "/",
    headers: process.env.NEXT_BASE_URL ? headersList : { cookie },
  });
};

export { buildClient };
