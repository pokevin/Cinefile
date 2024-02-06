import { getName } from "@tauri-apps/api/app";
import { createResource, createSignal } from "solid-js";
import packageJson from "../../package.json";
import { isTauriError } from "../utils/tauri";
import { Icon } from "./Icon";
import { SettingsModal } from "./SettingsModal";

const getAppName = async () => {
  try {
    return await getName();
  } catch (err) {
    if (isTauriError(err)) {
      console.error(
        "Tauri API App getName() is not supported in web environement",
      );
    }
  }
  return packageJson.name;
};

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = createSignal(false);
  const [appName] = createResource(getAppName);

  return (
    <header class="w-full flex gap-8 items-center p-16">
      <h1 class="text-4xl text-primary font-bold capitalize">{appName()}</h1>
      <div class="ml-auto text-body-secondary h-10">
        <button
          type="button"
          class="hover:text-body rounded"
          aria-label="Settings"
          onClick={() => setIsModalOpen(true)}
        >
          <Icon icon="gear" size={40} />
        </button>
      </div>
      <SettingsModal
        isOpen={isModalOpen()}
        onClose={() => setIsModalOpen(false)}
      />
    </header>
  );
};
