class UserActivity {
  tasks: Array<string> = ["Task1", "Task2", "Task3"];
}

class UserSalary {
  amountByTask = 100;
  tasksLength = 0;
  userActivity: UserActivity;

  constructor(userActivity: UserActivity) {
    this.userActivity = userActivity;
  }

  getSalary() {
    this.tasksLength = this.userActivity.tasks.length;

    return this.tasksLength * this.amountByTask;
  }
}

const userActivity = new UserActivity();
const userSalary = new UserSalary(userActivity);
console.log(userSalary.getSalary());
