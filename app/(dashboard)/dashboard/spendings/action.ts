//eslint-disable @typescript-eslint/no-explicit-any
"use server";

import { categoryTable } from "@/lib/db/schema";
import { db } from "@/lib/db/drizzle";
import { revalidatePath } from "next/cache";

// export async function addCategory(_: any, formData: FormData) {
//   const namee = formData.get("namee") as string;
//   const col = Math.floor(Math.random() * 256);
//   const res = await db
//     .insert(categoryTable)
//     .values({ color: `rgb(${col},${col},${col})`, name: namee });
//   revalidatePath("/category");
//   return { message: "jo" };
// }

export async function getCategories() {
  return await db.select().from(categoryTable);
}
