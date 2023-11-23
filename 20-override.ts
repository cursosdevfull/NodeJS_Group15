class Upload {
  uploadFile(file: File) {
    //this.validate(file)
    this.fileValidate(file);
    this.progress(file);
  }

  /*validate(file: File) {
      if(file.size>5000000) throw new Error("File must be less than 5MB")
      console.log("file validated")
    }*/

  fileValidate(file: File) {
    console.log("file validated");
  }

  progress(file: File) {
    console.log("file is uploading");
  }
}

class UploadAWS extends Upload {
  override validate(file: File) {
    if (file.size > 5000000) throw new Error("File must be less than 5MB");
    if (file.type !== "text/csv") throw new Error("File must be csv");
    console.log("File has validated");
  }
}

const file = new File(["data"], "data.csv", { type: "text/csv" });
const uploadAWS = new UploadAWS();
uploadAWS.uploadFile(file);
