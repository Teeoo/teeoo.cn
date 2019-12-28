export default (context) => {
  return {
    httpEndpoint: 'https://api.github.com/graphql',
    getAuth: () => `Bearer ${process.env.GITHUB_V4}`
  }
}
