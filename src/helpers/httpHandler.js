import { ZodError } from "zod";
import { FarmAlreadyExists, FarmIDInvalidError, FarmNotFound } from "../modules/farm/errors/farm.errors.js";
import { InvalidCredentialsError } from "../modules/auth/errors/auth.errors.js";

export class HttpHandler {

  static handleCreated({ data, message = 'creted with success' }, res) {
    return res.status(201).send({
      message,
      data: data || null,
      errors: []
    })
  }

  static handleSuccess({ data, message = 'exectuded with success' }, res) {
    return res.status(200).send({
      message,
      data: data || null,
      errors: []
    })
  }

  static handleError(error, res) {
    console.error(`[error] ${error.message}`, error.stack);

    if (error instanceof InvalidCredentialsError) {
      return res.status(403).send({
        message: 'invalid credentials',
        errors: []
      });
    }

    if (error instanceof FarmNotFound) {
      return res.status(404).json({
        message: 'farm not found',
        errors: []
      });
    }

    if (error instanceof FarmAlreadyExists) {
      return res.status(409).json({
        message: error.message || 'farm already exists',
        errors: []
      });
    }

    if (error instanceof FarmIDInvalidError) {
      return res.status(400).json({
        message: 'fail to validate request',
        errors: [error.message]
      });
    }


    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'fail to validate request',
        errors: error.errors.map(zodError => `'${zodError.path.join('.')}' ${zodError.message.toLowerCase()}`)
      });
    }

    return res.status(500).send({
      message: 'internal server error',
      errors: [
        error.message
      ]
    });

  };

}