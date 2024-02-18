import { Show } from "solid-js";
import { Header } from "./components/Header";
import { MediaLibrary } from "./components/MediaLibrary";
import { SelectMediaDirectoryButton } from "./components/SelectMediaDirectoryButton";
import { useConfig } from "./services/config";

function App() {
  const [config] = useConfig();

  return (
    <div class="text-body min-h-screen min-w-full">
      <Header />
      <main class="py-4 px-16">
        <Show when={!config().mediaDirectoryPath}>
          <SelectMediaDirectoryButton>
            Select the media directory
          </SelectMediaDirectoryButton>
        </Show>
        <MediaLibrary />
      </main>
    </div>
  );
}

export default App;
