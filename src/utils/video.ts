const videoFileExtensions = [
  "webm",
  "mkv",
  "flv",
  "vob",
  "ogv",
  "ogg",
  "drc",
  "avi",
  "mts",
  "m2ts",
  "mov",
  "qt",
  "wmv",
  "yuv",
  "rm",
  "rmvb",
  "viv",
  "amv",
  "mp4",
  "m4p",
  "m4v",
  "mpg",
  "mp2",
  "mpeg",
  "mpe",
  "mpv",
  "m2v",
  "m4v",
  "3gp",
  "3g2",
];

export const hasVideoFileExtension = (filename: string) => {
  const ext = filename.split(".").pop();
  return !!ext && videoFileExtensions.includes(ext);
};
