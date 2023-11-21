class User {
  name: string;
  email: string;
  private password: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  changeRandomPassword() {
    const newPassword = this.password + (Math.random() * 100 + 1).toString();
    this.password = newPassword;
  }
}

const user = new User("Silvia", "silvia@correo.com", "12345");
//user.password = "abcd"
user.changeRandomPassword();

console.log("user", user);
