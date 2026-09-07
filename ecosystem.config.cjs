module.exports = {
  apps: [
    {
      name: "trepang-dev",
      script: "node_modules/next/dist/bin/next",
      args: "start --hostname 127.0.0.1 --port 3333",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "750M",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
