import Image, { type ImageProps } from "next/image";
import { isUnoptimizedImageSrc } from "@/lib/blog-cover";

type BlogImageProps = Omit<ImageProps, "unoptimized"> & {
  src: string;
};

export function BlogImage({ src, alt, className, ...props }: BlogImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      unoptimized={isUnoptimizedImageSrc(src)}
      className={className}
      {...props}
    />
  );
}
