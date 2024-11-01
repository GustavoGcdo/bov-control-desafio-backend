import { z } from 'zod';

const SearchFarmProductionMonthSchema = z.object({
  month: z.string().regex(/^(0?[1-9]|1[0-2])$/, "must be between 1 and 12").transform(Number),
  year: z.string().regex(/^\d{4}$/, "must be a four-digit number").transform(Number)
});

export default SearchFarmProductionMonthSchema;
