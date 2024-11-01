import { z } from 'zod';

const CreateFarmSchema = z.object({
  name: z.string().min(3),
  code: z.string().min(3),
  distanceFromFactory: z.number().positive('"distanceFromFactory" must be positive'),
  farmers: z.array(
    z.object({
      name: z.string().min(1),
      phone: z.string().min(1),
    })
  ).nonempty('At least one farmer is required')
});

export default CreateFarmSchema;
