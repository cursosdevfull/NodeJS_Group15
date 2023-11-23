class RobotPadre {
  makeAmericanCoffe() {
    console.log("american coffe");
  }
}

class RobotHijo extends RobotPadre {
  makeCapuccino() {
    console.log("capuccino");
  }

  makeChocolate() {
    console.log("chocolate");
  }
}

const robot: RobotPadre = new RobotHijo();
robot.makeAmericanCoffe();
