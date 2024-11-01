import { z } from 'zod';

const AddFarmProductionSchema = z.object({
  milkQuantity: z.number(),
  productionDate: z.coerce.date()
});

export default AddFarmProductionSchema;
