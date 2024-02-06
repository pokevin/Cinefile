export function isTauriError(err: unknown): err is TypeError {
  return (
    err instanceof TypeError &&
    err.message === "window.__TAURI_IPC__ is not a function"
  );
}
