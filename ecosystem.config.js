module.exports = {
  apps: [{
    name: 'teeoo.cn',
    script: 'yarn',
    args: 'start',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: ['.nuxt', 'nuxt.config.js'],
    ignore_watch: ['node_modules'],
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}
