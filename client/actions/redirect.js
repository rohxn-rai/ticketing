"use server";

import { redirect } from "next/navigation";

const replacePath = (path) => {
  redirect(path);
};

export { replacePath };
