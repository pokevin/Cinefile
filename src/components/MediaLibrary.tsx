import { For } from "solid-js";
import type { Media } from "../services/medias";
import { PosterImage } from "./PosterImage";

type MediaLibraryProps = {
  medias: Media[];
};

export const MediaLibrary = (props: MediaLibraryProps) => (
  <ul class="py-4 px-16 flex gap-4 flex-wrap">
    <For each={props.medias}>
      {(item) => (
        <li class="flex flex-col group cursor-pointer relative w-40">
          <PosterImage alt={item.title} src={item.posterPath} />
          <div class="group-hover:opacity-50 absolute w-full aspect-poster bg-black border-2 border-primary opacity-0 transition-opacity" />
          <span class="font-semibold text-ellipsis  overflow-hidden whitespace-nowrap">
            {item.title}
          </span>
          <span class="text-body-secondary text-sm">
            {item.releaseDate.getFullYear()}
          </span>
        </li>
      )}
    </For>
  </ul>
);
