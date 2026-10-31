import { CmsFormattingError, formatCmsContentForPublish } from "@/lib/cms-format";
import { isAdmin } from "@/lib/cms-auth";

export const maxDuration = 60;

export async function POST(request: Request) {
  if (!await isAdmin()) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!process.env.GROQ_API_KEY) return Response.json({ error: "Groq is not configured for this deployment." }, { status: 503 });

  let content: unknown;
  try {
    ({ content } = await request.json());
  } catch {
    return Response.json({ error: "Invalid article content." }, { status: 400 });
  }
  if (typeof content !== "string" || !content.trim()) return Response.json({ error: "Add article content before verifying its structure." }, { status: 400 });

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: Record<string, unknown>) => controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      send({ type: "progress", stage: "Preparing article for structure review", progress: 10 });
      try {
        const result = await formatCmsContentForPublish(content, (stage, progress) => send({ type: "progress", stage, progress }));
        send({ type: "done", ...result, progress: 100 });
      } catch (error) {
        send({ type: "error", error: error instanceof CmsFormattingError ? error.message : "Could not verify the article structure." });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "cache-control": "no-cache, no-transform",
      connection: "keep-alive",
      "content-type": "text/event-stream; charset=utf-8",
    },
  });
}
