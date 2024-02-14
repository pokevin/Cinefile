import { createResource } from "solid-js";
import { v5 as uuidv5 } from "uuid";
import { Header } from "./components/Header";
import { MediaLibrary } from "./components/MediaLibrary";
import { useConfig } from "./services/config";
import { type Media, getMedias, insertMedias } from "./services/medias";
import { getVideoFilesFromPath } from "./services/tauri";

const getMediasFromPath = async (path: string) => {
  const [currentFiles, mediaList] = await Promise.all([
    getVideoFilesFromPath(path),
    getMedias(),
  ]);
  console.log({
    currentFiles,
    mediaList,
  });
  if (!currentFiles) return mediaList;
  const medias = mediaList.filter((media) =>
    currentFiles.some((file) => file.path === media.id),
  );
  if (medias.length !== currentFiles.length) {
    const newMedias: Media[] = currentFiles
      .filter((file) => !medias.some((media) => media.id === file.path))
      .map((file) => ({
        id: uuidv5(file.path, "00000000-0000-0000-0000-000000000000"),
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
  const [config] = useConfig();
  const mediaDirectoryPath = () => config().mediaDirectoryPath;
  const [medias] = createResource(mediaDirectoryPath, getMediasFromPath);

  return (
    <div class="text-body min-h-screen min-w-full">
      <Header />
      <main>
        <MediaLibrary medias={medias() ?? []} />
      </main>
    </div>
  );
}

export default App;
