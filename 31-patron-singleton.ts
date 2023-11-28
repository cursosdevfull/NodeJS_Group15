class Database {
  private readonly host: string;
  private readonly port: number;
  private readonly username: string;
  private readonly password: string;

  private static instance: Database;

  private constructor(
    host: string,
    port: number,
    username: string,
    password: string
  ) {
    console.log("date", new Date());
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
  }

  static create(
    host: string,
    port: number,
    username: string,
    password: string
  ) {
    if (!this.instance)
      this.instance = new Database(host, port, username, password);

    return this.instance;
  }

  get properties() {
    return {
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
    };
  }
}

const database1 = Database.create("localhost", 3306, "root", "12345");
const database2 = Database.create("localhost", 3306, "root", "12345");

console.log(database1.properties);
console.log(database2.properties);
