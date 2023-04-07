module.exports = {
  apps: [
    {
      name: "myapp",
      script: "./dist/server.js",
      watch: true,
      env: {
        NODE_ENV: "production",
        PORT: "3001",
        CHANNEL_ID: "1660832423",
        CHANNEL_SECRET: "1737f75dc53dbd7d997aceb091737b67",
        CHANNEL_ACCESS_TOKEN:
          "aaG7dJlNvQ9Xll+bIA3qQBmzPs0FzbJoCEUMw5cR2auu/qWhkA1Io41qkIc0twROyTHMFm1kQSjsKOPu55TCWMWSThfHPRsg6bZeigYl7NWXX9yhdPM55Ne6rQyd9d6mUBsW3U/LNDZPtKH2E0d9ZAdB04t89/1O/w1cDnyilFU=",
        NOTI: "hRITkDnZyGj9gXDJPVKHeutJqlvdk5FeQruPji3mojH",
        DB: "mongodb://localhost:27017/node-api-101",
        MENU1: "richmenu-3aee1cd89d41e691d1f9d215e32997c3",
        MENU2: "richmenu-8080897b6c592ed276e655aa0982f6cf",
      },
    },
  ],
};
