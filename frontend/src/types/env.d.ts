interface ImportMetaEnv {
  // for vitest
  readonly VITE_TEST_ALL: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
