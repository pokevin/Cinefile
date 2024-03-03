import { For, Show, createResource, createSignal } from "solid-js";
import { v5 as uuidv5 } from "uuid";
import { useConfig } from "../services/config";
import { useTranslation } from "../services/i18n/translate";
import {
  type Media,
  type MediaGenre,
  genresList,
  getMedias,
  insertMedias,
  updateMedia,
} from "../services/medias";
import { getVideoFilesFromPath, launchFile } from "../services/tauri";
import { EditMediaModal } from "./EditMediaModal";
import { Icon } from "./Icon";
import { PosterImage } from "./PosterImage";

const getMediasFromPath = async (path: string) => {
  if (!path) return [];
  const [currentFiles, mediaList] = await Promise.all([
    getVideoFilesFromPath(path),
    getMedias(),
  ]);
  if (!currentFiles) return mediaList;
  const medias = mediaList.filter((media) =>
    currentFiles.some((file) => file.path === media.url),
  );
  if (medias.length !== currentFiles.length) {
    const newMedias: Media[] = currentFiles
      .filter((file) => !medias.some((media) => media.url === file.path))
      .map((file) => ({
        id: uuidv5(file.path, "00000000-0000-0000-0000-000000000000"),
        title: file.name?.replace(/\.[^/.]+$/, "") ?? "Unknown",
        posterPath: "",
        genres: [],
        url: file.path,
        releaseDate: new Date(),
        updatedAt: new Date(),
      }));
    await insertMedias(newMedias);
    return [...medias, ...newMedias];
  }
  return medias;
};

export const MediaLibrary = () => {
  const [config, setConfig] = useConfig();
  const [editingMediaId, setEditingMediaId] = createSignal<string | undefined>(
    undefined,
  );
  const [genreFilter, setGenreFilter] = createSignal<MediaGenre | "">("");
  const { t } = useTranslation();
  const mediaDirectoryPath = () => config().mediaDirectoryPath;
  const [medias, { mutate }] = createResource(
    mediaDirectoryPath,
    getMediasFromPath,
  );

  const sortedFilteredMedia = () =>
    [...(medias() ?? [])]
      .sort((a, b) => {
        const fieldName = config().sortBy;
        const orderFactor = config().order === "asc" ? 1 : -1;
        const aValue = a[fieldName];
        const bValue = b[fieldName];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return orderFactor * aValue.localeCompare(bValue);
        }

        if (aValue instanceof Date && bValue instanceof Date) {
          return orderFactor * (aValue.getTime() - bValue.getTime());
        }
        return orderFactor * (+aValue - +bValue);
      })
      .filter(
        (media) =>
          genreFilter() === "" ||
          media.genres.includes(genreFilter() as MediaGenre),
      );

  const selectedMedia = async (url: string) => {
    launchFile(url).catch(console.error).then(console.info);
  };

  const saveMediaEdition = async (editedMedia: Media) => {
    await updateMedia(editedMedia);
    mutate((prev) =>
      prev?.filter((media) => media.id !== editedMedia.id).concat(editedMedia),
    );
    setEditingMediaId(undefined);
  };

  const editingMedia = () =>
    medias()?.find((media) => media.id === editingMediaId());

  return (
    <Show when={!!medias()?.length}>
      <div class="flex gap-2 p-4 items-center">
        <label for="sort-by">{t("Sort by")} :</label>
        <select
          id="sort-by"
          class="px-2 pt-1 pb-1.5 rounded-md"
          onChange={(e) => setConfig("sortBy", e.target.value)}
        >
          <option value="title">{t("Title")}</option>
          <option value="releaseDate">{t("Release date")}</option>
          <option value="updatedAt">{t("Updated at")}</option>
        </select>
        <label for="order">{t("Order")} :</label>
        <select
          id="order"
          class="px-2 pt-1 pb-1.5 rounded-md"
          onChange={(e) => setConfig("order", e.target.value)}
        >
          <option value="asc">↑ Asc</option>
          <option value="desc">↓ Desc</option>
        </select>
        <label for="filter-by-genre">{t("Filter by genre")} :</label>
        <select
          id="filter-by-genre"
          class="px-2 pt-1 pb-1.5 rounded-md"
          onChange={(e) => setGenreFilter(e.target.value as MediaGenre | "")}
        >
          <option value="" selected={genreFilter() === ""}>
            {t("All")}
          </option>
          {genresList.map((genre) => (
            <option value={genre} selected={genreFilter() === genre}>
              {t(genre)}
            </option>
          ))}
        </select>
      </div>
      <Show when={sortedFilteredMedia()?.length} fallback="Aucun">
        <ul class="flex gap-4 flex-wrap bg-black/30 rounded-3xl p-8">
          <For each={sortedFilteredMedia()}>
            {(item) => (
              <li class="group relative">
                <button
                  type="button"
                  class="text-left w-40 overflow-hidden group-hover:after:opacity-100 after:absolute after:top-0 after:left-0 after:w-full after:aspect-poster after:border-2 after:border-primary after:opacity-0 after:transition-opacity"
                  onClick={() => selectedMedia(item.url)}
                >
                  <PosterImage
                    alt={item.title}
                    src={item.posterPath}
                    class="group-hover:brightness-75"
                  />
                  <div class="font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                    {item.title}
                  </div>
                  <span class="text-body-secondary text-sm">
                    {item.releaseDate.getFullYear()}
                  </span>
                  <Icon
                    icon="play"
                    size={80}
                    class="absolute top-[calc(50%-24px)] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-4 bg-white/40 rounded-full text-white"
                  />
                </button>
                <button
                  type="button"
                  class="absolute right-0 top-0 p-1 opacity-0 group-hover:opacity-80 transition-opacity"
                  onclick={() => setEditingMediaId(item.id)}
                >
                  <Icon icon="pen" size={24} />
                </button>
              </li>
            )}
          </For>
          <Show when={editingMedia()}>
            {(media) => (
              <EditMediaModal
                media={media()}
                isOpen={!!editingMediaId()}
                onSave={saveMediaEdition}
                onClose={() => setEditingMediaId(undefined)}
              />
            )}
          </Show>
        </ul>
      </Show>
    </Show>
  );
};
