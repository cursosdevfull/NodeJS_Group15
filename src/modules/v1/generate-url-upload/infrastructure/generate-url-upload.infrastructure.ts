import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { err, ok, Result } from "neverthrow";

import { IError } from "../../../core/interface/error.interface";
import { Parameters } from "../../../core/parameters";
import { GenerateUrlUploadRepository } from "../domain/repositories/generate-url-upload.repository";

export type GenerateUrlResult = Result<string, IError>;

const bucketNameImage = Parameters.bucket_name_images;
const s3 = new S3({
  region: "us-east-1" /*, credentials: {accessKeyId: "", secretAccessKey: ""}*/,
});

export class GenerateUrlUploadInfrastructure
  implements GenerateUrlUploadRepository
{
  async urlPresigned(filename: string): Promise<GenerateUrlResult> {
    try {
      const url = await getSignedUrl(
        s3,
        new PutObjectCommand({
          Bucket: bucketNameImage,
          Key: filename,
        }),
        {
          expiresIn: Parameters.url_presigned_expires,
        }
      );

      return ok(url);
    } catch (error: any) {
      const objError: IError = new Error(error.message || error.sqlMessage);
      objError.status = 500;
      return err(objError);
    }
  }
}
