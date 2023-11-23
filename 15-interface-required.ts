/*interface UserProperties {
  userId: string;
  firstname: string;
  lastname: string;
  age: number;
  gender: string;
  email: string;
  tall: number;
}*/

interface UserEssentials {
  userId: string;
  firstname?: string;
  lastname: string;
  email: string;
}

interface UserOptionals {
  age: number;
  gender: string;
  tall: number;
}

interface IUser {
  update(): void;
  delete(): void;
  reconstitute(): void;
}

class User implements UserEssentials, UserOptionals, IUser {
  userId: string;
  firstname: string;
  lastname: string;
  age: number;
  gender: string;
  email: string;
  tall: number;

  constructor(obj: Required<UserEssentials> & Partial<UserOptionals>) {
    Object.assign(this, obj);
  }

  update() {
    throw new Error("method update doesn't implemented yet");
  }

  delete() {
    throw new Error("method delete doesn't implemented yet");
  }

  reconstitute() {
    throw new Error("method reconstitute doesn't implemented yet");
  }
}

const properties: Required<UserEssentials> & Partial<UserOptionals> = {
  userId: "3296bc04-e7af-43bf-b937-1b99a5e8d03e",
  firstname: "sara",
  lastname: "zapata",
  //age: 34,
  //gender: "Male",
  email: "usuario@domain.com",
  tall: 50,
};

const user = new User(properties);
console.log(user);
