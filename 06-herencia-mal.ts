class UserActivity {
  tasks: Array<string> = ["Task1", "Task2", "Task3"];
}

class UserSalary extends UserActivity {
  amountByTask = 100;

  getSalary() {
    return this.tasks.length * this.amountByTask;
  }
}

const userSalary = new UserSalary();
console.log(userSalary.getSalary());
