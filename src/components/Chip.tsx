import clsx from "clsx";
import { Icon } from "./Icon";

type ChipProps = {
  label: string;
  onDelete: () => void;
  class?: string;
  value?: string;
};

export const Chip = ({
  label,
  class: className,
  value,
  onDelete,
}: ChipProps) => {
  return (
    <div
      class={clsx(
        "flex gap-[0.4em] items-center bg-gray-700 px-1 rounded-lg h-fit text-sm",
        className,
      )}
    >
      {value && <input type="hidden" name="genres" value={value} />}
      <span class="pl-1 pb-1 pt-0.5">{label}</span>
      <button type="button" onClick={onDelete}>
        <Icon icon="x" class="w-[1em] h-[1em]" />
      </button>
    </div>
  );
};
