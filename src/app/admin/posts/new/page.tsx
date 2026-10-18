import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/cms-auth";
import { PostEditor } from "@/components/admin/post-editor";
export const dynamic="force-dynamic";
export default async function NewPost(){if(!await isAdmin())redirect("/admin/login");return <PostEditor/>}
