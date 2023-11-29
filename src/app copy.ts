import * as fs from 'fs';
import * as http from 'http';

export interface Route {
  [key: string]: {
    [key: string]: (
      request: http.IncomingMessage,
      response: http.ServerResponse
    ) => void;
  };
}

export const routes: Route = {
  GET: {
    "/user": (request: http.IncomingMessage, response: http.ServerResponse) => {
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
    },
    "/role": (request: http.IncomingMessage, response: http.ServerResponse) => {
      response.writeHead(200, { "content-type": "text/html" });
      response.write(`
          <h1>Role</h1>
      `);
      response.end();
    },
    "/pdf": (request: http.IncomingMessage, response: http.ServerResponse) => {
      response.writeHead(200, { "content-type": "application/pdf" });
      const file = fs.readFileSync(__dirname + "/manual.pdf");
      response.end(file);
    },
  },
  POST: {
    "/user": (request: http.IncomingMessage, response: http.ServerResponse) => {
      response.writeHead(200, { "content-type": "text/html" });
      response.write(`
        <h1>Response from POST /user</h1>
    `);
      response.end();
    },
  },
};

export const NotFound = (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => {
  response.writeHead(404, { "content-type": "text/plain" });
  response.end("Not Found");
};
