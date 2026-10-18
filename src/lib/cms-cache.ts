import { revalidatePath } from "next/cache";

export function revalidateCmsPublicPages(...slugs: string[]) {
  for (const slug of new Set(slugs.map((value) => value.trim()).filter(Boolean))) {
    revalidatePath(`/blog/${slug}`);
  }
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  revalidatePath("/feed.xml");
}
