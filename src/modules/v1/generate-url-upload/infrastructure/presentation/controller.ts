import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { GenerateUrlUploadApplication } from "../../application/generate-url-upload.application";

export class GenerateUrlUploadController {
  constructor(
    private readonly generateUrlUpload: GenerateUrlUploadApplication
  ) {}

  async generateUrlPresigned(req: Request, res: Response) {
    const { extension } = req.query;
    const filename = `${uuidv4()}.${extension}`;
    const url = await this.generateUrlUpload.urlPresigned(filename as string);
    res.json({ url, filename });
  }
}
