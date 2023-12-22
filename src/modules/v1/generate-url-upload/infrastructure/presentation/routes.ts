import { Router } from "express";

import { GenerateUrlUploadApplication } from "../../application/generate-url-upload.application";
import { GenerateUrlUploadRepository } from "../../domain/repositories/generate-url-upload.repository";
import { GenerateUrlUploadInfrastructure } from "../generate-url-upload.infrastructure";
import { GenerateUrlUploadController } from "./controller";

class GenerateUrlUploadRoutes {
  router: Router;
  controller: GenerateUrlUploadController;

  constructor(controller: GenerateUrlUploadController) {
    this.router = Router();
    this.controller = controller;
    this.mountRoutes();
  }

  private mountRoutes(): void {
    this.router.get("/", (req, res) =>
      this.controller.generateUrlPresigned(req, res)
    );
  }
}

const repository: GenerateUrlUploadRepository =
  new GenerateUrlUploadInfrastructure();
const application: GenerateUrlUploadApplication =
  new GenerateUrlUploadApplication(repository);
const controller: GenerateUrlUploadController = new GenerateUrlUploadController(
  application
);

export default new GenerateUrlUploadRoutes(controller).router;
