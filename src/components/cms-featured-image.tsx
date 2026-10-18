"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { isPinterestPinPage } from "@/lib/cms-image";

type Props = {
  src: string;
  alt: string;
  title?: string;
  onStatusChange?: (status: "empty" | "loading" | "loaded" | "failed") => void;
  editor?: boolean;
  compact?: boolean;
};

export function CmsFeaturedImage({ src, alt, title, onStatusChange, editor = false, compact = false }: Props) {
  const [failedSrc, setFailedSrc] = useState("");
  const pinterestPage = isPinterestPinPage(src);
  const failed = pinterestPage || failedSrc === src;

  useEffect(() => {
    if (!src) onStatusChange?.("empty");
    else onStatusChange?.(failed ? "failed" : "loading");
  }, [src, failed, onStatusChange]);

  if (!src) return editor ? <p className="text-xs text-slate-500">No featured image selected.</p> : null;

  const failedMessage = pinterestPage
    ? "This is a Pinterest pin page, not an image file. Upload the image in Media or use its direct image URL."
    : "This image could not be loaded. Check the URL or upload the image in Media.";

  if (compact) {
    return failed ? (
      <div className="absolute inset-0 flex items-center justify-center bg-[color:var(--surface-muted)] p-5 text-center text-sm font-semibold text-[color:var(--text-secondary)]">
        {title || "PixMorphy"}
      </div>
    ) : (
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 639px) 100vw, (max-width: 1199px) 50vw, 33vw"
        unoptimized
        className="object-cover"
        onLoad={() => onStatusChange?.("loaded")}
        onError={() => {
          setFailedSrc(src);
          onStatusChange?.("failed");
        }}
      />
    );
  }

  return (
    <div>
      {failed ? (
        <div role={editor ? "status" : undefined} className={`flex items-center justify-center rounded-2xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface-muted)] p-6 text-center text-sm text-[color:var(--text-secondary)] ${editor ? "min-h-28" : "aspect-[1200/630] max-h-[520px]"}`}>
          {editor ? failedMessage : <span className="font-semibold text-slate-700">{title || "PixMorphy"}</span>}
        </div>
      ) : (
        <div className={`relative overflow-hidden rounded-2xl ${editor ? "aspect-[1200/630] max-w-md" : "mb-8 aspect-[1200/630] max-h-[520px]"}`}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={editor ? "(max-width: 768px) 100vw, 448px" : "(max-width: 768px) 100vw, 768px"}
            unoptimized
            fetchPriority={editor ? "auto" : "high"}
            className="object-cover"
            onLoad={() => onStatusChange?.("loaded")}
            onError={() => {
              setFailedSrc(src);
              onStatusChange?.("failed");
            }}
          />
        </div>
      )}
      {editor && <p className={`mt-2 text-xs ${failed ? "text-red-700" : "text-slate-500"}`}>
        {failed ? failedMessage : "Preview the image here before publishing."}
      </p>}
    </div>
  );
}
