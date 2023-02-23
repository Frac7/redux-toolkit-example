// This script was customized from https://gist.github.com/Parthipan-Natkunam/20547a22e6df7a2b15fd5575eb39824f#file-sse_server-js by Parthipan Natkunam
// See https://medium.com/geekculture/understanding-server-sent-events-with-node-js-37cfc7aaa7b

// this is just to demo the concept of SSE, not intended for production usage.

const http = require("http");

const host = "127.0.0.1";
const port = 8080;

// A simple dataSource that changes over time
const dataSource = {};
const updateDataSource = () => {
  const score = Math.random() * 12;
  dataSource.score = score.toFixed(2);
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
