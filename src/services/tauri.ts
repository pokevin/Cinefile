import { invoke } from "@tauri-apps/api";
import { getName } from "@tauri-apps/api/app";
import { open } from "@tauri-apps/api/dialog";
import { readDir } from "@tauri-apps/api/fs";
import packageJson from "../../package.json";
import { hasVideoFileExtension } from "../utils/video";

function isTauriError(err: unknown): err is TypeError {
  return (
    err instanceof TypeError &&
    err.message === "window.__TAURI_IPC__ is not a function"
  );
}

const handleTauriError = (message: string) => (err: Error) => {
  if (isTauriError(err)) {
    console.error(message);
    return undefined;
  }
  throw err;
};

export const openDialogSelectDirectory = async (): Promise<
  string | undefined
> => {
  const selectedDirPath = await open({
    multiple: false,
    title: "Select the media directory",
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

export const launchFile = (filePath: string) => {
  return invoke("launch_file", { filePath }).catch(
    handleTauriError("Tauri API invoke() is not supported in web environement"),
  );
};

export const getVideoFilesFromPath = async (dirPath: string) => {
  if (!dirPath) return;
  const entries = await readDir(dirPath)
    .then((files) =>
      files.filter(
        (file) => !file.children && hasVideoFileExtension(file.path),
      ),
    )
    .catch(
      handleTauriError(
        "Tauri API FS readDir() is not supported in web environement",
      ),
    );
  return entries ?? [];
};
