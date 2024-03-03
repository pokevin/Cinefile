import { useConfig } from "../services/config";
import { useTranslation } from "../services/i18n/translate";
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
  const { t } = useTranslation();

  return (
    <Modal id="settings-modal" isOpen={props.isOpen} onClose={props.onClose}>
      <ModalHeader>{t("Settings")}</ModalHeader>
      <ModalContent class="p-6">
        <div class="flex flex-col gap-2">
          <label for="media-directory">
            {t("Media directory")}
            <span class="text-red-700">*</span>
          </label>
          <div class="flex gap-2 items-center">
            <input
              type="text"
              id="media-directory"
              class="h-full w-96"
              readOnly
              required
              value={config().mediaDirectoryPath}
            />
            <SelectMediaDirectoryButton>
              {t("Select the media directory")}
            </SelectMediaDirectoryButton>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
