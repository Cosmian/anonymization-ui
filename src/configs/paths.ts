export const BASE_PATH = "/cosmian"
export const paths_config = {
  anonymizations: "anonymizations",
  newAnonymization: "anonymizations/new",
  importAnonymization: "anonymizations/import",
  help: "help",
  notFound: "404",
}

export const link_config = {
  anonymizations: `${BASE_PATH}/${paths_config.anonymizations}`,
  newAnonymization: `${BASE_PATH}/${paths_config.newAnonymization}`,
  importAnonymization: `${BASE_PATH}/${paths_config.importAnonymization}`,
  help: `${BASE_PATH}/${paths_config.help}`,
  notFound: `${BASE_PATH}/${paths_config.notFound}`,
}
