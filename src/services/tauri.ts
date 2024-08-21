import { getName } from "@tauri-apps/api/app";
import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import { readDir } from "@tauri-apps/plugin-fs";
import { ClientOptions, fetch } from "@tauri-apps/plugin-http";
import { locale } from "@tauri-apps/plugin-os";
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

export const openDialogSelectDirectory = async (
  dialogTitle: string,
): Promise<string | undefined> => {
  const selectedDirPath = await open({
    multiple: false,
    title: dialogTitle,
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
        (file) => !file.isDirectory && hasVideoFileExtension(file.name),
      ),
    )
    .catch(
      handleTauriError(
        "Tauri API FS readDir() is not supported in web environement",
      ),
    );
  return entries ?? [];
};

export const tauriFetch = (
  input: URL,
  init?: Partial<RequestInit & ClientOptions>,
) =>
  fetch(input.toString(), {
    ...init,
    method: init?.method ?? "GET",
  }).catch(
    handleTauriError(
      "Tauri API HTTP fetch() is not supported in web environement",
    ),
  );

export const getLocale = () =>
  locale().catch(
    handleTauriError(
      "Tauri API OS locale() is not supported in web environement",
    ),
  );
