import { Router } from 'express';
import validateRequest from '../infra/middlewares/validateRequest.middleware.js';
import * as farmController from '../modules/farm/controllers/farm.controller.js';
import AddFarmProductionSchema from '../modules/farm/schemas/add-farm-production.schema.js';
import CreateFarmSchema from '../modules/farm/schemas/create-farm.schema.js';

const router = Router();

router.post('/farms', validateRequest(CreateFarmSchema), farmController.createFarm);
router.post('/farms/:id/milk-production', validateRequest(AddFarmProductionSchema), farmController.addFarmProduction);
router.get('/farms/:id/milk-production/summary', farmController.getMilkProduction);
router.get('/farms/:id/milk-price', farmController.getMilkPrice);
router.get('/farms/:id/milk-price/yearly', farmController.getMilkPriceMonthByYear);

export default router;
