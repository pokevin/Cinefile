import type { Media } from "../services/medias";
import { formatDate } from "../utils/date";
import { Icon } from "./Icon";
import { Modal } from "./Modal/Modal";
import { ModalContent } from "./Modal/ModalContent";
import { ModalHeader } from "./Modal/ModalHeader";
import { PosterImage } from "./PosterImage";

type EditMediaModalProps = {
  media: Media;
  isOpen: boolean;
  onSave: (editedMedia: Media) => void;
  onClose: () => void;
};

export const EditMediaModal = (props: EditMediaModalProps) => {
  const onSaveEdit = (event: Event) => {
    event.preventDefault();
    const { releaseDate, ...editedMedia } = Object.fromEntries(
      new FormData(event.target as HTMLFormElement),
    );
    props.onSave({
      ...props.media,
      ...editedMedia,
      releaseDate: new Date(releaseDate as string),
    });
  };

  return (
    <Modal id="edit-media-modal" isOpen={props.isOpen} onClose={props.onClose}>
      <ModalHeader>Edit media</ModalHeader>
      <ModalContent class="p-6">
        <form class="flex flex-col gap-8" onSubmit={onSaveEdit}>
          <div class="flex gap-8">
            <PosterImage
              alt={props.media.title}
              src={props.media.posterPath}
              class="border border-white"
            />
            <div class="flex flex-col gap-4 whitespace-nowrap">
              <div class="flex gap-2 items-center">
                <label for="media-title">
                  Title<span class="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  class="min-w-96 w-full"
                  id="media-title"
                  autocomplete="off"
                  required
                  value={props.media.title}
                />
              </div>
              <div class="flex gap-2 items-center">
                <label for="media-poster-path">Poster URL</label>
                <input
                  type="url"
                  autocomplete="photo"
                  class="min-w-96 w-full"
                  name="posterPath"
                  id="media-poster-path"
                  value={props.media.posterPath}
                />
              </div>
              <div class="flex gap-2 items-center">
                <label for="media-poster-path">
                  Release date<span class="text-red-700">*</span>
                </label>
                <input
                  type="date"
                  class="w-30"
                  id="media-release-date"
                  name="releaseDate"
                  required
                  value={formatDate(props.media.releaseDate)}
                />
              </div>
            </div>
          </div>
          <footer class="flex justify-between gap-4">
            <button
              type="button"
              class="flex gap-2 text-nowrap rounded-md opacity-90 hover:opacity-100 px-4 py-2 ml-auto"
              onClick={props.onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex gap-2 text-nowrap rounded-md bg-primary/90 hover:bg-primary px-4 py-2"
            >
              <Icon icon="floppy-disk" size={24} />
              Save
            </button>
          </footer>
        </form>
      </ModalContent>
    </Modal>
  );
};
