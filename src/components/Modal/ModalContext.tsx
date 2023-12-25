import { type JSXElement, createContext, useContext } from "solid-js";

export interface ModalContextProps {
  id: string;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

type ModalContextProviderProps = {
  value: ModalContextProps;
  children: JSXElement;
};

export const ModalContextProvider = (props: ModalContextProviderProps) => {
  return (
    <ModalContext.Provider value={props.value}>
      {props.children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error("useModalContext must be used within a Modal");
  }
  return modalContext;
};
