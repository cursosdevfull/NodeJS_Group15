type UserProperties = {
  name: string;
  lastname: string;
  cmp: string;
  email: string;
  age: number;
  specialty: string;
  subSpecialty: string;
};

class Medic {
  name: string;
  lastname: string;
  cmp: string;
  email: string;
  age: number;
  specialty: string;
  subSpecialty: string;

  constructor(props: UserProperties) {
    this.name = props.name;
    this.lastname = props.lastname;
    this.cmp = props.cmp;
    this.email = props.email;
    this.age = props.age;
    this.specialty = props.specialty;
    this.subSpecialty = props.subSpecialty;
  }
}

const userProperties = {
  lastname: "Hidalgo",
  name: "Sergio",
  cmp: "abc-123",
  email: "hidalgo@correo.com",
  age: 23,
  specialty: "Pediatría",
  subSpecialty: "Pediatría temprana",
};
const medic = new Medic(userProperties);
console.log(medic);
