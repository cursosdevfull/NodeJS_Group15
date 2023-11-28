type UserProperties = {
  name: string;
  lastname: string;
  cmp: string;
  email: string;
  age: number;
  specialtyId: number;
  subSpecialtyId: number;
};

class Medic {
  private medicId: number;
  private name: string;
  private lastname: string;
  private cmp: string;
  private email: string;
  private age: number;
  private specialtyId: number;
  private subSpecialtyId: number;

  constructor(props: UserProperties) {
    this.medicId = new Date().getTime();
    this.name = props.name;
    this.lastname = props.lastname;
    this.cmp = props.cmp;
    this.email = props.email;
    this.age = props.age;
    this.specialtyId = props.specialtyId;
    this.subSpecialtyId = props.subSpecialtyId;
  }
}

class MedicBuilder {
  name!: string;
  lastname!: string;
  cmp!: string;
  email!: string;
  age!: number;
  specialtyId!: number;
  subSpecialtyId!: number;

  addName(value: string) {
    this.name = value;
    return this;
  }

  addLastname(value: string) {
    this.lastname = value;
    return this;
  }

  addCmp(value: string) {
    this.cmp = value;
    return this;
  }

  addEmail(value: string) {
    this.email = value;
    return this;
  }

  addAge(value: number) {
    this.age = value;
    return this;
  }

  addSpecialtyId(value: number) {
    this.specialtyId = value;
    return this;
  }

  addSubSpecialtyId(value: number) {
    this.subSpecialtyId = value;
    return this;
  }

  build() {
    return new Medic(this);
  }
}

const medic = new MedicBuilder()
  .addName("Sergio")
  .addLastname("Hidalgo")
  .addCmp("abc-123")
  .addEmail("sergio@email.com")
  .addAge(34)
  .addSpecialtyId(10)
  .addSubSpecialtyId(4)
  .build();
