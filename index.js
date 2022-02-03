const http = require("http");
const path = require("path");
const fs = require("fs");

function getPage(page) {
  const filePath = path.join(__dirname, page);
  return fs.readFileSync(filePath);
}

http
  .createServer((req, res) => {
    const fileType = path.extname(req.url) || ".html";

    if (fileType === ".html") {
      res.setHeader("Content-type", "text/html");
      res.writeHead(200);

      if (req.url === "/") {
        res.write(getPage("index.html"));
      } else {
        res.write(getPage(`${req.url}.html`));
      }

      res.end();
    } else if (fileType === ".css") {
      res.setHeader("Content-type", "text/css");
      res.writeHead(200);

      res.write(getPage(req.url));

      res.end();
    } else {
      res.writeHead(404);
      res.end;
    }
  })
  .listen(3000);
