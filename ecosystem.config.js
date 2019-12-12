module.exports = {
  apps: [
    {
      name: 'teeoo.cn',
      script: 'yarn start',
      args: 'one two',
      instances: 1,
      autorestart: true,
      watch: ['.nuxt/'],
      ignore_watch: ['node_modules'],
      watch_options: {
        usePolling: true
      }
    }
  ]
}
