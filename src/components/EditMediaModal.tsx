import debounce from "debounce";
import { type JSX, createSignal } from "solid-js";
import { useTranslation } from "../services/i18n/translate";
import type { Media } from "../services/medias";
import { formatDate } from "../utils/date";
import { Icon } from "./Icon";
import { Modal } from "./Modal/Modal";
import { ModalContent } from "./Modal/ModalContent";
import { ModalHeader } from "./Modal/ModalHeader";
import { PosterImage } from "./PosterImage";
import { SearchMediaBar } from "./SearchMediaBar";

type EditMediaModalProps = {
  media: Media;
  isOpen: boolean;
  onSave: (editedMedia: Media) => void;
  onClose: () => void;
};

export const EditMediaModal = (props: EditMediaModalProps) => {
  const [editingMedia, setEditingMedia] = createSignal<
    Pick<Media, "title" | "posterPath" | "releaseDate" | "genres">
  >(props.media);
  const { t } = useTranslation();

  const handleChangePosterURL = debounce(
    (event: InputEvent & { target: HTMLInputElement }) => {
      if (event.target.validity.valid) {
        setEditingMedia((prev) => ({
          ...prev,
          posterPath: event.target.value,
        }));
      }
    },
  );

  const onSaveEdit: JSX.EventHandler<HTMLFormElement, Event> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { releaseDate, ...editedMedia } = Object.fromEntries(formData);
    props.onSave({
      ...props.media,
      ...editedMedia,
      genres: formData.getAll("genres") as Media["genres"],
      releaseDate: new Date(releaseDate as string),
      updatedAt: new Date(),
    });
  };

  return (
    <Modal id="edit-media-modal" isOpen={props.isOpen} onClose={props.onClose}>
      <ModalHeader>{t("Edit media")}</ModalHeader>
      <ModalContent class="p-6">
        <form class="flex flex-col gap-8" onSubmit={onSaveEdit}>
          <div class="flex gap-8">
            <PosterImage
              alt={props.media.title}
              src={editingMedia().posterPath}
              class="bg-white/20"
            />
            <div class="flex flex-col gap-4 whitespace-nowrap">
              <div class="flex gap-2 items-center">
                <label for="media-title">
                  {t("Title")}
                  <span class="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  class="min-w-96 w-full"
                  id="media-title"
                  autocomplete="off"
                  required
                  onInput={(e) =>
                    setEditingMedia((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  value={editingMedia().title}
                />
              </div>
              <div class="flex gap-2 items-center">
                <label for="media-poster-path">{t("Poster URL")}</label>
                <input
                  type="url"
                  autocomplete="photo"
                  class="min-w-96 w-full"
                  name="posterPath"
                  id="media-poster-path"
                  onInput={handleChangePosterURL}
                  value={editingMedia().posterPath}
                />
              </div>
              <div class="flex gap-2 items-center">
                <label for="genres">Genres</label>
                {editingMedia().genres.map((genre) => (
                  <input type="hidden" name="genres" value={genre} />
                ))}
                <input
                  type="text"
                  class="min-w-96 w-full"
                  id="genres"
                  disabled
                  value={editingMedia().genres.join(", ")}
                />
              </div>
              <div class="flex gap-2 items-center">
                <label for="media-release-date">
                  {t("Release date")}
                  <span class="text-red-700">*</span>
                </label>
                <input
                  type="date"
                  class="w-30"
                  id="media-release-date"
                  name="releaseDate"
                  required
                  onInput={(e) =>
                    setEditingMedia((prev) => {
                      const inputValue = e.target.valueAsDate;
                      return inputValue
                        ? {
                            ...prev,
                            releaseDate: inputValue,
                          }
                        : prev;
                    })
                  }
                  value={formatDate(editingMedia().releaseDate)}
                />
              </div>
              <div class="flex gap-2 items-center">
                <label for="media-path">{t("File path")}</label>
                <input
                  type="url"
                  readOnly
                  class="min-w-96 w-full"
                  id="media-path"
                  value={props.media.url}
                />
              </div>
              <div>
                <SearchMediaBar onSelectMedia={setEditingMedia} />
              </div>
            </div>
          </div>
          <footer class="flex justify-between gap-4">
            <button
              type="button"
              class="flex gap-2 text-nowrap rounded-md opacity-90 hover:opacity-100 px-4 py-2 ml-auto"
              onClick={props.onClose}
            >
              {t("Cancel")}
            </button>
            <button
              type="submit"
              class="flex gap-2 text-nowrap rounded-md bg-primary/90 hover:bg-primary px-4 py-2"
            >
              <Icon icon="floppy-disk" size={24} />
              {t("Save")}
            </button>
          </footer>
        </form>
      </ModalContent>
    </Modal>
  );
};
