export class UserEntity {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  roles: string[];
  gender: string;
  address: { street: string; number: number; city: string; country: string };
  age: number;
  image: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
