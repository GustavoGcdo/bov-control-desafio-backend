import { ZodError } from 'zod';

/**
 * Middleware para validar a request com Zod
 * @param {import('zod').ZodSchema} schema - O schema de validação Zod
 * @returns {function} Middleware Express
 */
const validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'fail to validate request',
        errors: error.errors.map(zodError => `'${zodError.path.join('.')}' ${zodError.message.toLowerCase()}`)
      });
    }

    return res.status(500).json({ message: 'server error' });
  }
};

export default validateRequest;
