import { buildClient } from "@/helpers/build-client";

export const getCurrentUser = async () => {
  const client = await buildClient();

  try {
    const { data } = await client.get("/api/users/currentuser", {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        Pragma: "no-cache",
        Expires: "0",
      },
      params: { _: Date.now() },
    });
    return data?.currentUser ?? null;
  } catch (e) {
    return null;
  }
};
