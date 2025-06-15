const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.url.endsWith(".html")) {
    const filePath = path.join(__dirname, "html", req.url);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        fs.readFile(
          path.join(__dirname, "html", "404.html"),
          (err404, data404) => {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(data404);
          }
        );
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else {
    res.writeHead(302, { Location: "/404.html" });
    res.end();
  }
});

server.listen(3005, () => {
  console.log("Web Server running at http://localhost:3005");
});
