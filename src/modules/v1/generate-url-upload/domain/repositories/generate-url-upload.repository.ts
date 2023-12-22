export interface GenerateUrlUploadRepository {
  urlPresigned(filename: string): Promise<string>;
}
