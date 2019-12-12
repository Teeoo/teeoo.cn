/* eslint-disable no-console */
export default (error, nuxtContext) => {
  nuxtContext.error(error.gqlError)
  console.error(error.gqlError)
}
