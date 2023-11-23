class DataStorageString {
  private data: string[] = [];

  addItem(item: string) {
    this.data.push(item);
  }

  removeItem(item: string) {
    if (this.data.indexOf(item) === -1) return;

    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

class DataStorageNumber {
  private data: number[] = [];

  addItem(item: number) {
    this.data.push(item);
  }

  removeItem(item: number) {
    if (this.data.indexOf(item) === -1) return;

    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

class DataStorageObject {
  private data: object[] = [];

  addItem(item: object) {
    this.data.push(item);
  }

  removeItem(item: object) {
    if (this.data.indexOf(item) === -1) return;

    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

class DataStorage<T extends string | number | boolean | object> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) return;

    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

//const textStorage = new DataStorageString()
const textStorage = new DataStorage<string>();
textStorage.addItem("Alicia");
textStorage.addItem("Claudia");
textStorage.addItem("Carla");
//textStorage.addItem(true)
textStorage.removeItem("Claudia");
console.log("textStorage", textStorage.getItems());

//const numberStorage = new DataStorageNumber()
const numberStorage = new DataStorage<number>();
numberStorage.addItem(10);
numberStorage.addItem(50);
numberStorage.addItem(45);
//numberStorage.addItem([{username: "jose.parlo"}])
numberStorage.removeItem(45);
console.log("numberStorage", numberStorage.getItems());

//const objectStorage = new DataStorageObject()
const objectStorage = new DataStorage<{ name: string }>();
objectStorage.addItem({ name: "Juan" });
objectStorage.addItem({ name: "Carla" });
objectStorage.addItem({ name: "Salvador" });
objectStorage.addItem({ name: "Viviana" });
objectStorage.removeItem({ name: "Juan" });
console.log("objectStorage", objectStorage.getItems());

const booleanStorage = new DataStorage<boolean>();
booleanStorage.addItem(true);
booleanStorage.addItem(false);
booleanStorage.addItem(true);
booleanStorage.addItem(true);
console.log("booleanStorage", booleanStorage.getItems());
