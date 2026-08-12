import type { ImgHTMLAttributes } from "react";

export function VaraMark({ className = "h-6 w-6", ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src="/favicon.png"
      alt="Vara"
      width={400}
      height={400}
      className={`${className} rounded-[4px] object-contain`}
      {...props}
    />
  );
}
