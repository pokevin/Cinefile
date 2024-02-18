import clsx from "clsx";
import type { JSX } from "solid-js/jsx-runtime";

export const PosterImage = (props: JSX.ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <img
      {...props}
      alt={props.alt}
      width={160}
      height={237}
      class={clsx(
        "aspect-poster w-40 object-cover text-white shadow-poster bg-black/30",
        props.class,
      )}
    />
  );
};
