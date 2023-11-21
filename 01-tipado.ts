//let username: string = "José Murillo"
let username = "José Murillo";
//username = true
username = "Claudia Trejo";

let agePatient: number;
let isLogged: boolean;
//let listNames: string[] = ["Martha", "Luisa"]
let listNames: Array<string> = ["Martha", "Luisa"];
listNames.push("María");
//listNames.push(30)

let listStudents: Array<{
  name: string;
  age: number;
  addresses: Array<string>;
}> = [];
listStudents.push({
  name: "Alfonso",
  age: 30,
  addresses: ["Avenida De la Paz 315", "Urbanización Las Praderas"],
});

let dataUsersToExport: Array<Array<{ name: string; age: number }>> = [
  [
    { name: "José", age: 20 },
    { name: "Claudia", age: 22 },
  ],
  [{ name: "Iván", age: 40 }],
];
