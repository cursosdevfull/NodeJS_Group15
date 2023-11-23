function extractProperty<T extends object, U extends keyof T>(obj: T, key: U) {
  return `Value: ${obj[key]}`;
}

const userProperties = {
  name: "Javier",
  lastname: "Luque",
  gender: "male",
  age: 43,
};

console.log(extractProperty(userProperties, "age"));
