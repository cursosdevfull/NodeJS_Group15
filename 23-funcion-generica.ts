function merge(objA: object, objB: object) {
  return Object.assign(objA, objB);
}

const mergeObj = merge({ name: "Max" }, { age: 30 });

console.log(mergeObj);

function merge2<T, U>(objA: { name: T }, objB: { age: U }) {
  return Object.assign(objA, objB);
}

const mergeObj2 = merge2<string, number>({ name: "Max" }, { age: 30 });
console.log(mergeObj2);

function merge3<T extends object, U>(objA: T, objB: U) {
  console.log(Object.keys(objA));
  return Object.assign(objA, objB);
}

//const mergeObj3 = merge3({name: "Max", lastname: "Doe"}, {age: 30, gender: "male"})
//const mergeObj3 = merge3(true, {age: 30, gender: "male"})
//const mergeObj3 = merge3({name: "Max", lastname: "Doe"}, 50)

type ObjA = { name: string };
type ObjB = { age: number };

//const mergeObj3 = merge3<{ name: string }, { age: number }>({ name: "Max" }, { age: 30 })
const mergeObj3 = merge3<ObjA, ObjB>({ name: "Max" }, { age: 30 });
console.log(mergeObj3);
