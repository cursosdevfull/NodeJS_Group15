class UserActivity {
  tasks: Array<string> = ["Task1", "Task2", "Task3"];
}

class UserSalary {
  amountByTask = 100;
  tasksLength = 0;

  getSalary() {
    const userActivity = new UserActivity();
    this.tasksLength = userActivity.tasks.length;

    return this.tasksLength * this.amountByTask;
  }
}

const userSalary = new UserSalary();
console.log(userSalary.getSalary());
