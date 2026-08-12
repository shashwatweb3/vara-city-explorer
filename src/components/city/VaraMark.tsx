import type { ImgHTMLAttributes } from "react";
import varaLogo from "@/assets/vara-logo.png.asset.json";

export function VaraMark({ className = "h-6 w-6", ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src={varaLogo.url}
      alt="Vara"
      width={400}
      height={400}
      className={`${className} rounded-[4px] object-contain`}
      {...props}
    />
  );
}
