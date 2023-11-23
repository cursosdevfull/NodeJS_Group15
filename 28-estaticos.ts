class Database {
  private static readonly protocol = "https";

  static getUrlConnection(
    host: string,
    username: string,
    password: string,
    schema: string
  ) {
    return `${this.protocol}://${host}/${username}:${password}/${schema}`;
  }

  static getProtocol() {
    return this.protocol;
  }

  returnCurrentProtocol() {
    return Database.getProtocol();
  }

  get currentProtocol() {
    return Database.getProtocol();
  }
}

//const database = new Database()
//console.log(database.protocol)
//console.log(Database.protocol)
//Database.protocol = "http"
console.log(Database.getProtocol());
console.log(
  Database.getUrlConnection(
    "database-pro.net.east-1.aws.com",
    "admin",
    "12345",
    "digital"
  )
);

const database = new Database();
console.log(database.returnCurrentProtocol());
console.log(database.currentProtocol);
