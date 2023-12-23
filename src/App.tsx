import { open } from "@tauri-apps/api/dialog";
import { readDir } from "@tauri-apps/api/fs";
import { createResource, createSignal } from "solid-js";

async function getFiles(selectedDirPath: string) {
  try {
    if (!selectedDirPath) return;
    const entries = await readDir(selectedDirPath as string);
    return entries;
  } catch (e) {
    console.error(e);
    return [];
  }
}

function App() {
  const [dirPath, setDirPath] = createSignal<string | undefined>(undefined);
  const [files] = createResource(dirPath, getFiles);

  const openDialogSelectDirectory = async () => {
    const selectedDirPath = await open({
      multiple: false,
      title: "Open a file",
      directory: true,
    });
    if (!selectedDirPath) return;
    setDirPath(selectedDirPath as string);
  };

  return (
    <div>
      <p>Selected path : {dirPath() ?? "None"}</p>
      <button type="button" onclick={openDialogSelectDirectory}>
        Select a folder
      </button>
      <p>{files()?.length === 0 && <span>No file found</span>}</p>
      <ul>
        {files()?.map((file) => (
          <li>{file.path}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
