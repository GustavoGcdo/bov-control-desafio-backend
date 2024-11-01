import { HttpHandler } from '../../../helpers/httpHandler.js';
import { LoginWithDefaultUser } from '../usercases/loginWithDefaultUser.js';

/**
 * Controller para criar usuario
 * @param {import('express').Request } req
 * @param {import('express').Response} res
 */
export async function login(req, res) {
  try {
    const { username, password } = req.body;

    const useCase = new LoginWithDefaultUser();
    const result = await useCase.handle({ username, password });

    const output = {
      token: result
    };

    HttpHandler.handleSuccess({ data: output }, res);
  } catch (error) {
    HttpHandler.handleError(error, res);
  }
}