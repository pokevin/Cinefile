import clsx from "clsx";
import { For } from "solid-js";

interface ComboboxProps {
  id: string;
  options: { title: string; subtitle: string }[];
  onInput: (value: string) => void;
  onChange: (value: string) => void;
  type?: "text" | "search";
  placeholder?: string;
  class?: string;
}

export const Combobox = (props: ComboboxProps) => (
  <>
    <input
      id={props.id}
      type={props.type ?? "text"}
      list={`list-${props.id}`}
      autocomplete="off"
      aria-autocomplete="list"
      aria-haspopup="listbox"
      onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      onInput={(e) => props.onInput(e.target.value)}
      onChange={(e) => {
        props.onChange(e.target.value);
        e.target.blur();
      }}
      placeholder={props.placeholder}
      class={clsx("w-full", props.class)}
    />
    <datalist id={`list-${props.id}`}>
      <For each={props.options}>
        {(option) => <option value={option.title}>{option.subtitle}</option>}
      </For>
    </datalist>
  </>
);
