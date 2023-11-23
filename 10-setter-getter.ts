class UserActivity {
  tasks: Array<string> = ["Task1", "Task2", "Task3"];
}

class UserSalary {
  amountByTask = 100;
  tasksLength = 0;
  userActivity: UserActivity;
  storeSalary = 0;

  constructor(userActivity: UserActivity) {
    this.userActivity = userActivity;
  }

  get salary() {
    if (this.storeSalary === 0) {
      this.tasksLength = this.userActivity.tasks.length;
      return this.tasksLength * this.amountByTask;
    }

    return this.storeSalary;
  }

  set salary(amount: number) {
    this.storeSalary = amount;
  }
}

const userActivity = new UserActivity();
const userSalary = new UserSalary(userActivity);

userSalary.salary = 1500;

console.log(userSalary.salary);
