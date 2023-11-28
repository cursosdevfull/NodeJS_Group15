import * as fs from "fs";
import * as http from "http";

const server = http.createServer(
  (request: http.IncomingMessage, response: http.ServerResponse) => {
    if (request.url === "/user") {
      response.writeHead(200, { "content-type": "text/html" });
      response.write(`
        <table>
            <tr>
                <th>id</th>
                <th>name</th>
            </tr>
            <tr>
                <td>1</td>
                <td>John</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Smith</td>
            </tr>
        </table>
    `);
      response.end();
    } else if (request.url === "/role") {
      response.writeHead(200, { "content-type": "text/html" });
      response.write(`
          <h1>Role</h1>
      `);
      response.end();
    } else if (request.url === "/pdf") {
      response.writeHead(200, { "content-type": "application/pdf" });
      const file = fs.readFileSync(__dirname + "/manual.pdf");
      response.end(file);
    }
  }
);

server.listen(3000, () => console.log("Server is running in port 3000"));
