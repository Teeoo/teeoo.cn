export default (error, context) => {
  context.error({
    statusCode: error.graphQLErrors[0].statusCode,
    message: error.graphQLErrors[0]
  })
}
