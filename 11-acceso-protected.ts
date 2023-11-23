class User {
  readonly userId = "3296bc04-e7af-43bf-b937-1b99a5e8d03e";
  protected readonly password = "OGWoB_GPv7!_9St1&g";
}

class Developer extends User {
  getPasswordLength() {
    return this.password.length;
  }

  getUserId() {
    return this.userId;
  }
}

class DeveloperCloud extends Developer {
  getPassword() {
    return this.password;
  }
}

const developer = new Developer();
//console.log(developer.password)
