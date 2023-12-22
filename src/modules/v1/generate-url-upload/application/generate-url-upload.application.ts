import { GenerateUrlUploadRepository } from "../domain/repositories/generate-url-upload.repository";

export class GenerateUrlUploadApplication {
  constructor(private readonly generatUrlUpload: GenerateUrlUploadRepository) {}

  async urlPresigned(filename: string) {
    return await this.generatUrlUpload.urlPresigned(filename);
  }
}
