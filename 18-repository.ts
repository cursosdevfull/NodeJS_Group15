class User {
  id: number;
  //email: string

  constructor(
    public firstname: string,
    private lastname: string,
    readonly age: number,
    readonly email: string
  ) {
    this.id = new Date().getTime();

    if (age < 18) throw new Error("User must be 18 years old");
    //this.firstname = firstname
    //this.lastname = lastname
    //this.age = age
    //this.email = email
  }
}

interface UserCreateRepository {
  find(email: string): User | undefined;
  insert(user: User): User;
  list(): Array<User>;
  delete(id: number): void;
}

class UserCreate {
  constructor(private readonly userDB: UserCreateRepository) {}

  execute(user: User) {
    const userMatched = this.userDB.find(user.email);

    if (!userMatched) {
      this.userDB.insert(user);
    } else {
      throw new Error("There is email in database");
    }
  }

  list() {
    return this.userDB.list();
  }

  delete(id: number): void {
    this.userDB.delete(id);
  }
}

class UserDB implements UserCreateRepository {
  usersInMemory: Array<User> = [];

  find(email: string): User | undefined {
    return this.usersInMemory.find((user) => user.email === email);
  }

  list() {
    return this.usersInMemory;
  }

  insert(user: User): User {
    this.usersInMemory.push(user);
    return user;
  }

  validFormatEmail(email: string) {
    return true;
  }

  delete(id: number) {
    const position = this.usersInMemory.findIndex((user) => user.id === id);

    if (position >= 0) {
      this.usersInMemory.splice(position, 1);
    }
  }
}

const user = new User("Carla", "Aranda", 23, "carla@correo.com");
const userDB: UserCreateRepository = new UserDB();
const userCreate = new UserCreate(userDB);
userCreate.execute(user);

const user2 = new User("Jorge", "Casas", 34, "jorge@correo.com");
userCreate.execute(user2);

const id = user2.id;

userCreate.delete(id);

console.log(userCreate.list());
