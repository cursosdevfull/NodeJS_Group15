import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { Parameters } from "../../../core/parameters";
import { GenerateUrlUploadRepository } from "../domain/repositories/generate-url-upload.repository";

const bucketNameImage = Parameters.bucket_name_images;
const s3 = new S3({
  region: "us-east-1" /*, credentials: {accessKeyId: "", secretAccessKey: ""}*/,
});

export class GenerateUrlUploadInfrastructure
  implements GenerateUrlUploadRepository
{
  async urlPresigned(filename: string) {
    try {
      return await getSignedUrl(
        s3,
        new PutObjectCommand({
          Bucket: bucketNameImage,
          Key: filename,
        }),
        {
          expiresIn: Parameters.url_presigned_expires,
        }
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
