import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { IError } from "../../../../core/interface/error.interface";
import { GenerateUrlUploadApplication } from "../../application/generate-url-upload.application";

export class GenerateUrlUploadController {
  constructor(
    private readonly generateUrlUpload: GenerateUrlUploadApplication
  ) {}

  async generateUrlPresigned(req: Request, res: Response, next: NextFunction) {
    const { extension } = req.query;
    const filename = `${uuidv4()}.${extension}`;
    const result = await this.generateUrlUpload.urlPresigned(
      filename as string
    );
    if (result.isErr()) {
      const error: IError = new Error(result.error.message);
      error.stack = result.error.stack;
      error.status = result.error.status;

      return next(error);
    }

    const url = result.value as string;
    res.json({ url, filename });
  }
}
