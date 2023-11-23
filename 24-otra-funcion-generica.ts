interface Lengthy {
  length: number;
}

//function countInElement<T extends Lengthy>(element: T): [T, string] {
function countInElement<U, T extends Array<U>>(element: T): [T, string] {
  let description = "Got no value";
  if (element.length === 1) {
    description = "Got 1 element";
  } else if (element.length > 1) {
    description = `Got ${element.length} elements`;
  }

  return [element, description];
}

//console.log(countInElement(["Soccer", "Swim"]))
console.log("As string", countInElement<string, Array<string>>(["José"]));
console.log("As number", countInElement<number, Array<number>>([20, 50, 78]));
console.log(
  "As boolean",
  countInElement<boolean, Array<boolean>>([true, false, false, false, true])
);
