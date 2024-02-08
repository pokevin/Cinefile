import { For, createResource } from "solid-js";
import { Header } from "./components/Header";
import { MediaLibrary } from "./components/MediaLibrary";
import { useConfig } from "./services/config";
import { type Media, getMedias, insertMedias } from "./services/medias";
import {
  getVideoFilesFromPath,
  openDialogSelectDirectory,
} from "./services/tauri";

const getMediasFromPath = async (path: string) => {
  const [currentFiles, mediaList] = await Promise.all([
    getVideoFilesFromPath(path),
    getMedias(),
  ]);
  if (!currentFiles) return mediaList;
  const medias = mediaList.filter((media) =>
    currentFiles.some((file) => file.path === media.id),
  );
  if (medias.length !== currentFiles.length) {
    const newMedias: Media[] = currentFiles
      .filter((file) => !medias.some((media) => media.id === file.path))
      .map((file) => ({
        id: file.path,
        title: file.name?.replace(/\.[^/.]+$/, "") ?? "Unknown",
        posterPath: "",
        url: file.path,
        releaseDate: new Date(),
      }));
    await insertMedias(newMedias);
    return [...medias, ...newMedias];
  }
  return medias;
};

function App() {
  const [config, setConfig] = useConfig();
  const mediaDirectoryPath = () => config().mediaDirectoryPath;
  const [medias] = createResource(mediaDirectoryPath, getMediasFromPath);

  const onSelectFolder = async () => {
    const selectedDirPath = await openDialogSelectDirectory();
    if (selectedDirPath) {
      setConfig("mediaDirectoryPath", selectedDirPath);
    }
  };

  return (
    <div class="text-body min-h-screen min-w-full">
      <Header />
      <main>
        <MediaLibrary medias={medias() ?? []} />
        <p>Selected path : {mediaDirectoryPath() ?? "None"}</p>
        <button type="button" onclick={onSelectFolder}>
          Select a folder
        </button>
        <p>{medias()?.length === 0 && <span>No file found</span>}</p>
        <ul>
          <For each={medias()}>
            {(item) => <li>{JSON.stringify(item, null, 2)}</li>}
          </For>
        </ul>
      </main>
    </div>
  );
}

export default App;
