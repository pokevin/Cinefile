import { getName } from "@tauri-apps/api/app";
import { open } from "@tauri-apps/api/dialog";
import packageJson from "../../package.json";

function isTauriError(err: unknown): err is TypeError {
  return (
    err instanceof TypeError &&
    err.message === "window.__TAURI_IPC__ is not a function"
  );
}

const handleTauriError = (message: string) => (err: Error) => {
  if (isTauriError(err)) {
    console.error(message);
  }
  return undefined;
};

export const openDialogSelectDirectory = async (): Promise<
  string | undefined
> => {
  const selectedDirPath = await open({
    multiple: false,
    title: "Open a file",
    directory: true,
  }).catch(
    handleTauriError(
      "Tauri API Dialog open() is not supported in web environement",
    ),
  );
  if (!selectedDirPath) return undefined;
  return selectedDirPath as string;
};

export const getAppName = async () => {
  const appName = await getName().catch(
    handleTauriError(
      "Tauri API App getName() is not supported in web environement",
    ),
  );
  return appName ?? packageJson.name;
};
