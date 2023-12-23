import clsx from "clsx";
import type { JSX } from "solid-js/jsx-runtime";

export const PosterImage = ({
  alt,
  ...props
}: JSX.ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    {...props}
    alt={alt}
    class={clsx(
      "aspect-poster w-40 object-cover shadow-poster bg-black/30",
      props.class,
    )}
  />
);
