import { validate, ValidationError } from "class-validator";
import { Response } from "express";

export function getErrors(errors: any) {
  const constraints = errors.map((error: any) => {
    if (error.constraints) return error.constraints;
    return error.children.map((child: any) => {
      if (child.constraints) return child.constraints;
      return child.children.map((child: any) => child.constraints);
    });
  });

  const listErrors = constraints.reduce((accum: any[], value: any) => {
    if (Array.isArray(value)) {
      const messages: string[] = value
        .map((item: any) => {
          if (Array.isArray(item)) {
            const subMessages: string[] = item
              .map((subitem: any) => {
                const listMessages = [];
                for (const key in item) {
                  listMessages.push(item[key]);
                }

                return listMessages;
              })
              .flatMap((item: any) => item);

            return subMessages;
          } else {
            const listMessages = [];
            for (const key in item) {
              listMessages.push(item[key]);
            }

            return listMessages;
          }
        })
        .flatMap((item: any) => item);
      return accum.concat(messages);
    } else {
      const messages: string[] = [];
      for (const key in value) {
        messages.push(value[key]);
      }
      return accum.concat(messages);
    }
  }, []);

  const positionJSON = listErrors.findIndex(
    (item: any) => typeof item === "object"
  );
  if (positionJSON !== -1) {
    const elementDeleted = listErrors.splice(positionJSON, 1);
    listErrors.splice(positionJSON, 1);
    for (const element in elementDeleted) {
      for (const key in elementDeleted[element]) {
        console.log(key, elementDeleted[element][key]);
        listErrors.push(elementDeleted[element][key]);
      }
    }
  }

  return listErrors;
}

export async function validateData(
  instance: any,
  options: any,
  response: Response
) {
  const errors: ValidationError[] = await validate(instance, options);
  if (errors.length > 0) {
    response.status(411).json(getErrors(errors));
    return false;
  }

  return true;
}
