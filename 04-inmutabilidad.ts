class User {
  private readonly userId: string;
  name: string;
  private readonly email: string;
  private password: string;

  constructor(name: string, email: string, password: string) {
    this.userId = "efe820a8-2ee5-43f4-bdd8-7b38542663b8";
    this.name = name;
    this.email = email;
    this.password = password;
  }

  process() {
    //this.userId = "abcd"
    //this.email = "silvia.diaz@midominio.com"
  }
}

const user = new User("Silvia", "silvia@correo.com", "12345");
//user.email = "silvia@email.com"
// user.userId = "abcde"
user.process();
console.log("user", user);
