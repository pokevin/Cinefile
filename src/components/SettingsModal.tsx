import { useConfig } from "../services/config";
import { Modal } from "./Modal/Modal";
import { ModalContent } from "./Modal/ModalContent";
import { ModalHeader } from "./Modal/ModalHeader";
import { SelectMediaDirectoryButton } from "./SelectMediaDirectoryButton";

type SettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SettingsModal = (props: SettingsModalProps) => {
  const [config] = useConfig();

  return (
    <Modal id="settings-modal" isOpen={props.isOpen} onClose={props.onClose}>
      <ModalHeader>Settings</ModalHeader>
      <ModalContent class="p-6">
        <div class="flex flex-col gap-2">
          <label>
            Media directory<span class="text-red-700">*</span>
          </label>
          <div class="flex gap-2 items-center">
            <input
              type="text"
              class="h-full w-96"
              readOnly
              required
              value={config().mediaDirectoryPath}
            />
            <SelectMediaDirectoryButton>
              Select the media directory
            </SelectMediaDirectoryButton>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
