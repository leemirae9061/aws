module.exports = {
  apps: [
    {
      name: "restAPI",
      script: "index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
    },
  ],
};
