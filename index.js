const fs = require("fs");
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const pathName = req.url;
  let message = '';
  if (req. method === 'GET', pathName === "/") {
    res.writeHead(200, { "Content-type": "text/html" });
    fs.readFile("./index.html", "utf-8", (err, data) => {
      
      res.end(data);
    });
  }  else if (req.method === 'POST' && pathName === '/message') {
      req.on('data', (data) => {
          message += data;
      });
      req.on('end', () => {
          res.writeHead(200, { 'Content-type' : 'text/html'})
          fs.writeFile('./message.txt', message, 'utf-8', err => {
              if (err) {
                  console.log('error writing file')
              } else {
                  console.log('file written successfuly')
              }
              res.end()
          });
      })
  } else {
    res.writeHead(404, {
      "Content-type": "text/html"
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening");
});
