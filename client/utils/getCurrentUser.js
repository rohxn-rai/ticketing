import { buildClient } from "@/helpers/build-client";

export const getCurrentUser = async () => {
  const client = await buildClient();

  try {
    const { data } = await client.get("/api/users/currentuser");
    return data.currentUser;
  } catch (error) {
    console.log(error)
    return null;
  }
};
