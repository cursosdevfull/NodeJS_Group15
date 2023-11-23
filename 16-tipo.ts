type GENDER = "MALE" | "FEMALE";

type ADDRESS = {
  location: string;
  city: string;
  country: string;
};

interface UserEssentials {
  userId: string;
  firstname?: string;
  lastname: string;
  email: string;
  address: ADDRESS;
}

interface UserOptionals {
  age: number;
  gender: GENDER;
  tall: number;
}

interface IUser {
  update(): void;
  delete(): void;
  reconstitute(): void;
}

type UserProperties = Required<UserEssentials> & Partial<UserOptionals>;

class User implements UserEssentials, UserOptionals, IUser {
  userId: string;
  firstname: string;
  lastname: string;
  age: number;
  gender: GENDER;
  email: string;
  tall: number;
  address: ADDRESS;

  constructor(obj: UserProperties) {
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

const properties: UserProperties = {
  userId: "3296bc04-e7af-43bf-b937-1b99a5e8d03e",
  firstname: "sara",
  lastname: "zapata",
  //age: 34,
  gender: "MALE",
  email: "usuario@domain.com",
  tall: 50,
  address: {
    location: "Avenida Del Sur 123",
    city: "Cahuide",
    country: "Perú",
  },
};

const user = new User(properties);
console.log(user);
