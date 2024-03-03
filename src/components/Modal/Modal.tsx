import { type JSXElement, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { ModalContextProvider } from "./ModalContext";

type ModalProps = {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  children: JSXElement;
};

export const Modal = (props: ModalProps) => {
  const id = props.id;
  return (
    <ModalContextProvider value={{ id, onClose: props.onClose }}>
      <Portal>
        <Show when={props.isOpen}>
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <div
            role="dialog"
            aria-labelledby={`${id}-title`}
            aria-describedby={`${id}-description`}
            class="w-full h-full top-0 left-0 bg-black/50 fixed"
          >
            <div
              role="document"
              class="min-w-8 min-h-8 bg-background text-body absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm"
            >
              {props.children}
            </div>
          </div>
        </Show>
      </Portal>
    </ModalContextProvider>
  );
};
