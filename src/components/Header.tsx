import { getName } from "@tauri-apps/api/app";
import { createResource } from "solid-js";
import { Icon } from "./Icon";

export const Header = () => {
  const [appName] = createResource(getName);
  return (
    <header class="w-full flex gap-8 items-center p-16">
      <h1 class="text-4xl text-primary font-bold capitalize">{appName()}</h1>
      <div class="ml-auto text-body-secondary h-10">
        <button
          type="button"
          class="hover:text-body rounded"
          aria-label="Settings"
        >
          <Icon icon="gear" size={40} />
        </button>
      </div>
    </header>
  );
};
