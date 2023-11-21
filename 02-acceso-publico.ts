class Animal {
  /*  public raza: string = "Siberian Husky";
      color: string = "negro";
      esMamifero: boolean = true
    */
  public raza: string;
  color: string;
  esMamifero: boolean;

  constructor() {
    this.raza = "Siberian Husky";
    this.color = "negro";
    this.esMamifero = true;
  }

  descripcion() {
    return (
      "Raza= " +
      this.raza +
      " Color= " +
      this.color +
      " ¿Es mamifero? " +
      this.esMamifero
    );
  }
}

const animal = new Animal();
animal.raza = "Samoyedo";
console.log("Raza", animal.raza);
console.log("Color", animal.color);
console.log("Es mamifero?", animal.esMamifero);
console.log(animal.descripcion());
