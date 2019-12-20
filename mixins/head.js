export default function(config) {
  const { title = '' } = config
  return {
    head() {
      return {
        title,
        meta: [
          {
            itemprop: 'name',
            content: `愿你历尽千帆,归来仍是少年`
          },
          {
            itemprop: 'description',
            content: `生如夏花之绚烂，死如秋叶之静美`
          },
          {
            itemprop: 'image'
            // content: `https://api.ixiaowai.cn/api/api.php?${new Date().getFullYear()}`
          }
        ]
      }
    }
  }
}
