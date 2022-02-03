const http = require("http");
const path = require("path");
const fs = require("fs");
const moment = require("moment");

function getPage(page) {
  const filePath = path.join(__dirname, page);
  return fs.readFileSync(filePath);
}

function handleFiles(req, res) {
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
}

function getData(url) {
  let data;
  if (url === "/apis/users") {
    data = [{ name: "John" }, { name: "Michael" }];
  } else if (url === "/apis/posts") {
    data = [
      { title: "A", publishedData: moment().startOf("day").fromNow() },
      {
        title: "B",
        publishedData: moment().set("month", 1).startOf("day").fromNow(),
      },
    ];
  }
  return data;
}

function handleAPIs(req, res) {
  let data = getData(req.url);

  if (data) {
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(data));
  } else {
    res.writeHead(404);
  }
  res.end();
}

http
  .createServer((req, res) => {
    if (req.url.startsWith("/apis/")) {
      handleAPIs(req, res);
    } else {
      handleFiles(req, res);
    }
  })
  .listen(3000);
