import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/cms-auth";
import { PostEditor } from "@/components/admin/post-editor";
export const dynamic="force-dynamic";
export default async function EditPost({params}:{params:Promise<{id:string}>}){if(!await isAdmin())redirect("/admin/login");const {id}=await params;return <PostEditor postId={id}/>}
