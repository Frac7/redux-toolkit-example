// this is just to demo the concept of SSE, not intended for production usage.

const http = require("http");

const host = "127.0.0.1";
const port = 8080;

// A simple dataSource that changes over time
const dataSource = {};
const updateDataSource = () => {
  const random = Math.random() * 12;
  dataSource.random = random.toFixed(2);
};

const requestListener = function (req, res) {
  if (req.url === "/user") {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("connection", "keep-alive");
    res.setHeader("Content-Type", "text/event-stream");

    setInterval(() => {
      const data = JSON.stringify(dataSource);
      res.write(`id: ${new Date().toLocaleTimeString()}\ndata: ${data}\n\n`);
    }, 1000);
  } else {
    res.statusCode = 404;
    res.end("resource does not exist");
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  setInterval(() => updateDataSource(), 10000);
  console.log(`server running at http://${host}:${port}`);
});
