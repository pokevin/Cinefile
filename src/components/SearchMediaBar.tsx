import debounce from "debounce";
import { createSignal } from "solid-js";
import { createResource } from "solid-js";
import { useTranslation } from "../services/i18n/translate";
import type { Media } from "../services/medias";
import { searchMedia } from "../services/tmdb";
import { Combobox } from "./Combobox";
import { Icon } from "./Icon";

const searchMedias = async ([input, lang]: readonly [
  input: string,
  lang?: string,
]) => {
  const results = await searchMedia(input, lang);
  return results.results;
};

type SearchMediaBarProps = {
  onSelectMedia: (
    media: Pick<Media, "title" | "posterPath" | "releaseDate" | "genres">,
  ) => void;
};

export const SearchMediaBar = (props: SearchMediaBarProps) => {
  const [inputValue, setInputValue] = createSignal("");
  const { t, locale } = useTranslation();
  const [searchResults] = createResource(
    () => [inputValue(), locale()] as const,
    searchMedias,
  );

  const onSelectMedia = (title: string) => {
    const selectedMedia = searchResults()?.find(
      (media) => media.title === title,
    );
    if (selectedMedia) {
      props.onSelectMedia({
        title: selectedMedia.title,
        posterPath: selectedMedia.poster_path,
        genres: selectedMedia.genres,
        releaseDate: new Date(selectedMedia.release_date),
      });
    }
  };

  const handleInput = debounce(setInputValue, 200);

  return (
    <div class="relative">
      <Icon
        icon="magnifying-glass"
        class="absolute left-2 top-1/2 -translate-y-1/2"
        size={24}
      />
      <Combobox
        id="search-media"
        type="search"
        class="pl-10"
        onInput={handleInput}
        onChange={onSelectMedia}
        placeholder={t("Search a media")}
        options={
          searchResults()?.map((res) => ({
            title: res.title,
            subtitle: res.overview,
          })) ?? []
        }
      />
    </div>
  );
};
