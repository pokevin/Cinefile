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
              class="peer h-full w-96 rounded-[7px] border border-white bg-transparent px-3 py-2 text-sm font-normal outline-0 transition-all read-only:text-slate-500 read-only:border-0 read-only:bg-slate-800"
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
