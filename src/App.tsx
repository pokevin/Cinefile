import { createResource, createSignal } from "solid-js";
import { Header } from "./components/Header";
import { MediaLibrary } from "./components/MediaLibrary";
import { getMedias } from "./services/medias";
import { getFilesFromPath, openDialogSelectDirectory } from "./services/tauri";

function App() {
  const [dirPath, setDirPath] = createSignal<string | undefined>(undefined);
  const [files] = createResource(dirPath, getFilesFromPath);
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
            <li>{JSON.stringify(file, null, 2)}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
