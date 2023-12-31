import type { JSX } from "solid-js/jsx-runtime";

export type IconName = "gear" | "x";

type IconProps = JSX.SvgSVGAttributes<SVGSVGElement> & {
  icon: IconName;
  size?: number;
};

export const Icon = ({ icon, size, ...props }: IconProps) => {
  return (
    <svg role="img" aria-hidden="true" width={size} height={size} {...props}>
      <use href={`/icons.svg#${icon}`} />
    </svg>
  );
};
