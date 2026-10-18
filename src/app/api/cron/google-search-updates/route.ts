import { syncGoogleGuidance } from "@/lib/google-guidance";
export async function GET(request:Request){const secret=process.env.CRON_SECRET;if(!secret||request.headers.get("authorization")!==`Bearer ${secret}`)return Response.json({error:"Unauthorized"},{status:401});const result=await syncGoogleGuidance();return Response.json(result,{status:result.ok?200:502});}
