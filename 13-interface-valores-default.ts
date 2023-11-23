interface UserProperties {
  userId: string;
  firstname: string;
  lastname: string;
  age: number;
  gender: string;
  email: string;
  tall: number;
}

interface IUser {
  update(): void;
  delete(): void;
  reconstitute(): void;
}

class User implements UserProperties, IUser {
  userId: string = "";
  firstname: string = "";
  lastname: string = "";
  age: number = 10;
  gender: string = "female";
  email: string = "";
  tall: number = 0;

  constructor(obj: UserProperties) {
    Object.assign(this, obj);
    // this.userId = obj.userId;
    // this.firstname = obj.firstname;
    // this.lastname = obj.lastname;
    // this.age = obj.age;
    // this.gender = obj.gender;
    // this.email = obj.email;
    // this.tall = obj.tall;
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

const properties: UserProperties = {
  userId: "3296bc04-e7af-43bf-b937-1b99a5e8d03e",
  firstname: "sara",
  lastname: "zapata",
  age: 34,
  gender: "Male",
  email: "usuario@domain.com",
  tall: 50,
};
