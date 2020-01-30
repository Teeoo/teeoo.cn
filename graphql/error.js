export default (error, nuxtContext) => {
  nuxtContext.error(error.gqlError)
}
