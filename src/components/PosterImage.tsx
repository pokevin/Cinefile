import clsx from "clsx";
import { createSignal } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";

export const PosterImage = ({
  alt,
  ...props
}: JSX.ImgHTMLAttributes<HTMLImageElement>) => {
  const [src, setSrc] = createSignal(props.src);
  return (
    <img
      {...props}
      src={src()}
      onerror={() => setSrc("")}
      alt={alt}
      width={160}
      height={237}
      class={clsx(
        "aspect-poster w-40 object-cover text-white shadow-poster bg-black/30",
        props.class,
      )}
    />
  );
};
