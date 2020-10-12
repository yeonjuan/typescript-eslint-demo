import libs from "@/ts-libs";

export interface Files {
  [name: string]: string;
}

export const LIB_FILES = Object.entries(libs).reduce(
  (files, [name, text]) => ({
    ...files,
    [name]: text,
  }),
  {} as Files
);

export function createFilesIncludeLibs(name: string, text: string): Files {
  return Object.assign(LIB_FILES, { [name]: text });
}
