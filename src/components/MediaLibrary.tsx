import { For } from "solid-js";
import { PosterImage } from "./PosterImage";

interface Media {
  id: string;
  title: string;
  year: number;
  imageUrl?: string;
}

type MediaLibraryProps = {
  medias: Media[];
};

export const MediaLibrary = ({ medias }: MediaLibraryProps) => (
  <ul class="py-4 px-16 flex gap-4 flex-wrap">
    <For each={medias}>
      {(item) => (
        <li class="flex flex-col group cursor-pointer relative">
          <PosterImage alt={item.title} src={item.imageUrl} />
          <div class="group-hover:opacity-50 absolute w-full aspect-poster bg-black border-2 border-primary opacity-0 transition-opacity" />
          <span class="font-semibold">{item.title}</span>
          <span class="text-body-secondary text-sm">{item.year}</span>
        </li>
      )}
    </For>
  </ul>
);
