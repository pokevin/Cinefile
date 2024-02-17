import { For } from "solid-js";
import type { Media } from "../services/medias";
import { launchFile } from "../services/tauri";
import { PosterImage } from "./PosterImage";

type MediaLibraryProps = {
  medias: Media[];
};

export const MediaLibrary = (props: MediaLibraryProps) => {
  const selectedMedia = async (url: string) => {
    launchFile(url).catch(console.error).then(console.info);
  };
  return (
    <ul class="flex gap-4 flex-wrap">
      <For each={props.medias}>
        {(item) => (
          <li class="group relative">
            <button
              type="button"
              class="text-left w-40 overflow-hidden group-hover:after:opacity-50 after:absolute after:top-0 after:left-0 after:w-full after:aspect-poster after:bg-black after:border-2 after:border-primary after:opacity-0 after:transition-opacity"
              onclick={() => selectedMedia(item.url)}
            >
              <PosterImage alt={item.title} src={item.posterPath} />
              <div class="font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                {item.title}
              </div>
              <span class="text-body-secondary text-sm">
                {item.releaseDate.getFullYear()}
              </span>
            </button>
          </li>
        )}
      </For>
    </ul>
  );
};
