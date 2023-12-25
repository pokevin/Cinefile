import clsx from "clsx";
import type { JSX } from "solid-js/jsx-runtime";
import { Icon } from "../Icon";
import { useModalContext } from "./ModalContext";

export const ModalHeader = (props: JSX.HTMLAttributes<HTMLElement>) => {
  const { id, onClose } = useModalContext();
  return (
    <header
      {...props}
      class={clsx("flex items-center gap-8 px-6 py-4", props.class)}
    >
      {!!props.children && (
        <h2 id={id ? `${id}-title` : undefined} class="text-2xl">
          {props.children}
        </h2>
      )}
      <button type="button" aria-label="Close modal" onClick={onClose}>
        <Icon icon="x" size={28} />
      </button>
    </header>
  );
};
