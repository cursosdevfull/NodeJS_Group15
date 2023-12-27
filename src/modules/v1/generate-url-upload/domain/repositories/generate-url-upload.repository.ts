import { GenerateUrlResult } from "../../infrastructure/generate-url-upload.infrastructure";

export interface GenerateUrlUploadRepository {
  urlPresigned(filename: string): Promise<GenerateUrlResult>;
}
