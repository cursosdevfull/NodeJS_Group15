interface IUpload {
  save(file: File): void;
}

class FactoryUploadAWS implements IUpload {
  save(file: File) {
    console.log(`File: ${file.name} saved at AWS`);
  }
}

class FactoryUploadAzure implements IUpload {
  save(file: File) {
    console.log(`File: ${file.name} saved at Azure`);
  }
}

class FactoryUploadGoogle implements IUpload {
  save(file: File) {
    console.log(`File: ${file.name} saved at Google`);
  }
}

class FactoryUploadDO implements IUpload {
  save(file: File) {
    console.log(`File: ${file.name} saved at DigitalOcean`);
  }
}

enum CloudEnum {
  AWS = "AWS",
  AZURE = "AZURE",
  GOOGLE = "GOOGLE",
  DO = "DO",
}

interface IFactory {
  [key: string]: IUpload;
}

type CLOUD = "AWS" | "AZURE" | "GOOGLE" | "DO";

/*const factories: IFactory = {
    AWS: new FactoryUploadAWS(),
    AZURE: new FactoryUploadAzure(),
    GOOGLE: new FactoryUploadGoogle(),
    DO: new FactoryUploadDO()
  }*/

const factories: Record<CLOUD, IUpload> = {
  AWS: new FactoryUploadAWS(),
  AZURE: new FactoryUploadAzure(),
  GOOGLE: new FactoryUploadGoogle(),
  DO: new FactoryUploadDO(),
};

function selectFactory(cloud: CloudEnum) {
  return factories[cloud];
  /*if(cloud===CloudEnum.AWS) {
      return new FactoryUploadAWS()
    } else if(cloud===CloudEnum.AZURE) {
      return new FactoryUploadAzure()
    } else if(cloud===CloudEnum.GOOGLE) {
      return new FactoryUploadGoogle()
    } else {
      return new FactoryUploadDO()
    }*/
}

const file: File = new File(["content"], "myData.txt", { type: "text/plain" });
const upload: IUpload = selectFactory(CloudEnum.DO);
upload.save(file);
