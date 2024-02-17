import clsx from "clsx";
import { JSX } from "solid-js/jsx-runtime";
import { useConfig } from "../services/config";
import { openDialogSelectDirectory } from "../services/tauri";

export const SelectMediaDirectoryButton = (
  props: JSX.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  const [, setConfig] = useConfig();

  const onSelectFolder = async () => {
    const selectedDirPath = await openDialogSelectDirectory();
    if (selectedDirPath) {
      setConfig("mediaDirectoryPath", selectedDirPath);
    }
  };

  return (
    <button
      type="button"
      {...props}
      class={clsx(
        "text-nowrap rounded-md bg-primary/90 hover:bg-primary px-4 py-2",
        props.class,
      )}
      onclick={(e) => {
        onSelectFolder();
        if (!props.onclick) return;
        if (typeof props.onclick === "function") {
          props.onclick(e);
          return;
        }
        props.onclick[0](props.onclick[1], e);
      }}
    >
      {props.children}
    </button>
  );
};
