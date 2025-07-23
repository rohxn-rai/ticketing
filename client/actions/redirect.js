"use server";

import { redirect } from "next/navigation";

const replacePath = (path, type) => {
  redirect(path, type);
};

export { replacePath };
