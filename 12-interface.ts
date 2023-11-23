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
  userId: string;
  firstname: string;
  lastname: string;
  age: number;
  gender: string;
  email: string;
  tall: number;

  constructor(
    userId: string,
    firstname: string,
    lastname: string,
    age: number,
    gender: string,
    email: string,
    tall: number
  ) {
    this.userId = userId;
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
    this.gender = gender;
    this.email = email;
    this.tall = tall;
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
