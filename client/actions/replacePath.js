"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const replacePath = (path, type) => {
  revalidatePath(path, "layout");
  redirect(path, type);
};

export default replacePath;
