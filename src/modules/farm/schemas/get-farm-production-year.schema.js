import { z } from 'zod';



const SearchFarmProductionYearSchema = z.object({  
  year: z.string().regex(/^\d{4}$/, "must be a four-digit number").transform(Number)
});

export default SearchFarmProductionYearSchema;
