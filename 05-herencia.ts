class Animal {
  breed: string;
  color: string;

  constructor(breed: string, color: string) {
    this.breed = breed;
    this.color = color;
  }

  description() {
    return { breed: this.breed, color: this.color };
  }
}

class Mamal extends Animal {
  kind: string = "Feline";
}

const mamal = new Mamal("Feline", "yellow");
console.log(mamal.description());
