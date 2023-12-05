import { Pagination } from "../../../../../core/interface/pagination";
import { User } from "../../../domain/roots/user";

export class UserResponse {
  id: string;
  name: string;
  lastname: string;
  email: string;
  roles: string[];
  gender: string;
  address: { street: string; number: number; city: string; country: string };
  age: number;
  image: string;
}

export class UserDto {
  static fromDomainToResponse(
    data: User | User[]
  ): UserResponse | UserResponse[] {
    if (Array.isArray(data)) {
      return data.map(
        (user) => this.fromDomainToResponse(user) as UserResponse
      );
    }
    const props = data.properties();

    const userResponse = new UserResponse();
    userResponse.id = props.id;
    userResponse.name = props.name;
    userResponse.lastname = props.lastname;
    userResponse.email = props.email;
    userResponse.roles = props.roles;
    userResponse.gender = props.gender;
    userResponse.address = {
      street: props.address?.street,
      number: props.address?.number,
      city: props.address?.city,
      country: props.address?.country,
    };
    userResponse.age = props.age;
    userResponse.image = props.image;

    return userResponse;
  }

  static fromDomainToResponsePagination(
    data: Pagination<User>
  ): Pagination<UserResponse> {
    const users = data.data.map(
      (user) => this.fromDomainToResponse(user) as UserResponse
    );

    return {
      total: data.total,
      page: data.page,
      data: users,
    };
  }
}
