import { isAdmin } from "@/lib/cms-auth";
import { syncGoogleGuidance } from "@/lib/google-guidance";
export async function POST(){if(!await isAdmin())return Response.json({error:"Unauthorized"},{status:401});const result=await syncGoogleGuidance();return Response.json(result,{status:result.ok?200:502});}
