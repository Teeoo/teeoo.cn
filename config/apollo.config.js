export default (ctx) => {
  return {
    // required
    httpEndpoint: process.env.HTTP_ENDPOINT,
    // optional
    // See https://www.apollographql.com/docs/link/links/http.html#options
    httpLinkOptions: {
      credentials: 'same-origin'
    },
    // Enable Automatic Query persisting with Apollo Engine
    persisting: true // Optional
  }
}
