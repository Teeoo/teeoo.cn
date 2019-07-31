module.exports = {
  apps: [{
    name: 'teeoo.cn',
    script: 'npm',
    args: 'run start',
    instances: 1,
    autorestart: true,
    watch: [".nuxt", "nuxt.config.js"],
    ignore_watch: ["node_modules"],
    watch_options: {
      "followSymlinks": false,
      "usePolling": true,
    },
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};