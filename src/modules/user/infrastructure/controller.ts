import { Request, Response } from 'express';

import { User, UserProperties } from '../domain/roots/user';

export class UserController {
  list(req: Request, res: Response) {
    const userProperties: UserProperties = {
      id: "1",
      name: "John",
      lastname: "Smith",
      email: "j@correo.com",
      password: "123456",
      roles: ["admin"],
    };

    const user = new User(userProperties);

    res.status(200).type("text/html").send(`
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
  }
}
