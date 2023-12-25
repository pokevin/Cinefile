import type { JSX } from "solid-js/jsx-runtime";
import { useModalContext } from "./ModalContext";

export const ModalContent = (props: JSX.HTMLAttributes<HTMLElement>) => {
  const { id } = useModalContext();
  return (
    <main {...props} id={id ?? `${id}-description`}>
      {props.children}
    </main>
  );
};
