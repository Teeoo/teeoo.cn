module.exports = {
  apps: [
    {
      name: 'teeoo.cn',
      cwd: './',
      script: 'yarn',
      args: 'start',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: true,
      ignore_watch: ['node_modules'],
      watch_delay: 10000,
      watch_options: {
        followSymlinks: false,
        usePolling: true
      },
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}
