import { Modal } from "./Modal/Modal";
import { ModalContent } from "./Modal/ModalContent";
import { ModalHeader } from "./Modal/ModalHeader";

type SettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SettingsModal = (props: SettingsModalProps) => {
  return (
    <Modal id="settings-modal" isOpen={props.isOpen} onClose={props.onClose}>
      <ModalHeader>Settings</ModalHeader>
      <ModalContent>
        <p>Content</p>
      </ModalContent>
    </Modal>
  );
};
