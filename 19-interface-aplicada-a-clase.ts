interface IUpload {
  save(file: File): void;
}

class UploadAWS implements IUpload {
  save(file: File): void {
    this.progress(file);
  }

  progress(file: File) {
    console.log("file is uploading");
  }
}

class UploadAzure implements IUpload {
  save(file: File): void {
    console.log("Subiendo");
  }
}

class UploadGoogle implements IUpload {
  save(file: File): void {
    console.log("Subiendo");
  }
}

class UploadFile {
  constructor(private readonly repository: IUpload) {}

  execute(file: File) {
    if (!file.type.startsWith("image/")) {
      throw new Error("File is not a file");
    }

    console.log("file uploaded");
  }
}

const file = new File(["data"], "image.png", { type: "image/png" });

const uploadAWS: IUpload = new UploadAWS();
const uploadAzure: IUpload = new UploadAzure();
const uploadGoogle: IUpload = new UploadGoogle();

const uploadFile = new UploadFile(uploadGoogle);
uploadFile.execute(file);
