const names = [
  "Luis",
  "Martha",
  110,
  false,
  { date: new Date("2023-11-23T01:00:10Z") },
];
names.push(10);
names.push(true);
names.push({ date: new Date() });

const users: Array<string | number | boolean | { date: Date }> = [
  "Luis",
  "Martha",
];
users.push(20);
users.push(true);
users.push({ date: new Date() });
