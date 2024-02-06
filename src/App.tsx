import { readDir } from "@tauri-apps/api/fs";
import { createResource, createSignal } from "solid-js";
import { Header } from "./components/Header";
import { MediaLibrary } from "./components/MediaLibrary";
import { getMedias } from "./services/medias";
import { openDialogSelectDirectory } from "./services/tauri";

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
  const [data] = createResource(getMedias);

  const onSelectFolder = async () => {
    const selectedDirPath = await openDialogSelectDirectory();
    if (selectedDirPath) setDirPath(selectedDirPath);
  };

  return (
    <div class="text-body min-h-screen min-w-full">
      <Header />
      <main>
        <MediaLibrary medias={data() ?? []} />
        <p>Selected path : {dirPath() ?? "None"}</p>
        <button type="button" onclick={onSelectFolder}>
          Select a folder
        </button>
        <p>{files()?.length === 0 && <span>No file found</span>}</p>
        <ul>
          {files()?.map((file) => (
            <li>{file.path}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
