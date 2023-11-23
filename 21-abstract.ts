abstract class Upload {
  abstract newFilename: string;
  abstract saveFile(file: File): void;

  constructor(newDate: Date) {
    this.progress(newDate);
  }

  progress(newDate: Date) {
    console.log("file uploading", newDate.toISOString());
  }

  status() {
    console.log("40% uploaded");
  }
}

class UploadAWS extends Upload {
  newFilename: string = new Date().getTime().toString() + ".jpg";

  /*constructor() {
      super()
      this.newFilename =  new Date().getTime().toString()+".jpg"
    }*/

  constructor(newDate: Date) {
    super(newDate);
  }

  override progress(newDate: Date) {
    console.log("new file uploading", newDate.toISOString());
    this.status();
  }

  override status() {
    super.status();
    console.log("95% uploaded");
  }

  saveFile(file: File) {
    console.log("File uploaded to AWS: " + this.newFilename);
  }
}

const file = new File(["data"], "image.jpg", { type: "image/jpg" });
const uploadAWS = new UploadAWS(new Date());
uploadAWS.saveFile(file);
