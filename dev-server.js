const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.env.PORT || 5299);
const host = "127.0.0.1";
const root = __dirname;
const types = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
};

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${host}:${port}`);
    const requestPath = url.pathname === "/" ? "index.html" : decodeURIComponent(url.pathname.slice(1));
    const filePath = path.resolve(root, requestPath);

    if (!filePath.startsWith(root)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
    }

    fs.readFile(filePath, (error, data) => {
        if (error) {
            res.writeHead(404);
            res.end("Not found");
            return;
        }

        res.writeHead(200, {
            "Content-Type": types[path.extname(filePath).toLowerCase()] || "application/octet-stream",
            "Cache-Control": "no-store",
        });
        res.end(data);
    });
});

server.listen(port, host, () => {
    console.log(`Preview running at http://${host}:${port}/`);
});
