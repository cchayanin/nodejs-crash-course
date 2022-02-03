const http = require("http");
const path = require("path");
const fs = require("fs");

function getPage(page) {
  const filePath = path.join(__dirname, page);
  return fs.readFileSync(filePath);
}

http
  .createServer((req, res) => {
    res.setHeader("Content-type", "text/html");
    res.writeHead(200);
    res.write(getPage("index.html"));
    res.end();
  })
  .listen(3000);
