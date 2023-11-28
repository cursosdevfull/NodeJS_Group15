type TYPE_FACTORY = "CLOUD" | "ON_PREMISE";
type TYPE_DESTINATION =
  | "AWS"
  | "AZURE"
  | "GOOGLE"
  | "DO"
  | "OPENSHIFT01"
  | "OPENSHIFT02";

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

class FactoryUploadOpenshift01 implements IUpload {
  save(file: File) {
    console.log(`File: ${file.name} saved at Openshift 01`);
  }
}

class FactoryUploadOpenshift02 implements IUpload {
  save(file: File) {
    console.log(`File: ${file.name} saved at Openshift 02`);
  }
}

const abstractFactories: Record<TYPE_FACTORY, Record<string, IUpload>> = {
  CLOUD: {
    AWS: new FactoryUploadAWS(),
    AZURE: new FactoryUploadAzure(),
    GOOGLE: new FactoryUploadGoogle(),
    DO: new FactoryUploadDO(),
  },
  ON_PREMISE: {
    OPENSHIFT01: new FactoryUploadOpenshift01(),
    OPENSHIFT02: new FactoryUploadOpenshift02(),
  },
};

function selectFactory(
  cloudOrOnPremise: TYPE_FACTORY,
  destination: TYPE_DESTINATION
): IUpload | string {
  return abstractFactories[cloudOrOnPremise][destination] ?? "not found";
}

const file: File = new File(["content"], "myData.txt", { type: "text/plain" });
const upload: IUpload | string = selectFactory("CLOUD", "AZURE");

if (typeof upload === "string") throw "Error in select";

upload.save(file);
