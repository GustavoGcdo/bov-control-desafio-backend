import { HttpHandler } from '../../../helpers/httpHandler.js';
import SearchFarmProductionYearSchema from '../schemas/get-farm-production-year.schema.js';
import SearchFarmProductionMonthSchema from '../schemas/get-farm-production.schema.js';
import { AddFarmProduction } from '../useCases/addFarmProduction.js';
import { CreateFarm } from '../useCases/createFarm.js';
import { GetMilkPrice } from '../useCases/getMilkPrice.js';
import { GetMilkPriceMonthByYear } from '../useCases/getMilkPriceMonthByYear.js';
import { GetMilkProduction } from '../useCases/getMilkProduction.js';

/**
 * @typedef {import("../repositories/farm.repository.js").IFarmRepository} IFarmRepository
 * @typedef {import("../service/currencyConverter.service.js").ICurrencyConverter} ICurrencyConverter
 */

/**
 * Controller para criar fazenda
 * @param {import('express').Request & { container: { cradle: { farmRepository: IFarmRepository  } } }} req
 * @param {import('express').Response} res
 */
export async function createFarm(req, res) {
  try {
    const { farmRepository } = req.container.cradle;
    const farmDTO = req.body;
    const useCase = new CreateFarm(farmRepository);
    const result = await useCase.handle(farmDTO);

    HttpHandler.handleCreated({ data: result, message: 'farm created with success' }, res);
  } catch (error) {
    HttpHandler.handleError(error, res);
  }
}

/**
 * Controller para adicionar a produção de leite
 * @param {import('express').Request & { container: { cradle: { farmRepository: IFarmRepository } } }} req
 * @param {import('express').Response} res
 */
export async function addFarmProduction(req, res) {
  try {
    const { farmRepository } = req.container.cradle;
    const farmDTO = req.body;
    const useCase = new AddFarmProduction(farmRepository);
    const result = await useCase.handle({
      ...farmDTO,
      farmId: req.params.id
    });

    HttpHandler.handleCreated({ data: result, message: 'farm production added with success' }, res);
  } catch (error) {
    HttpHandler.handleError(error, res);
  }
}


/**
 * Controller para consultar a produção de leite
 * @param {import('express').Request & { container: { cradle: { farmRepository: IFarmRepository } } }} req
 * @param {import('express').Response} res
 */
export async function getMilkProduction(req, res) {
  try {
    const { farmRepository } = req.container.cradle;
    const dto = SearchFarmProductionMonthSchema.parse(req.query);
    const useCase = new GetMilkProduction(farmRepository);
    const result = await useCase.handle({
      ...dto,
      farmId: req.params.id
    });

    HttpHandler.handleSuccess({ data: result }, res);
  } catch (error) {
    HttpHandler.handleError(error, res);
  }
}

/**
 * Controller para consultar o preço do leite mensal
 * @param {import('express').Request & { container: { cradle: { farmRepository: IFarmRepository, currencyConverter: ICurrencyConverter } } }} req
 * @param {import('express').Response} res
 */
export async function getMilkPrice(req, res) {
  try {
    const { farmRepository, currencyConverter } = req.container.cradle;

    const dto = SearchFarmProductionMonthSchema.parse(req.query);
    const useCase = new GetMilkPrice(farmRepository, currencyConverter);
    const result = await useCase.handle({
      ...dto,
      farmId: req.params.id
    });

    HttpHandler.handleSuccess({ data: result }, res);
  } catch (error) {
    HttpHandler.handleError(error, res);
  }
}



/**
 * Controller para consultar o preço do leite mensal
 * @param {import('express').Request & { container: { cradle: { farmRepository: IFarmRepository, currencyConverter: ICurrencyConverter } } }} req
 * @param {import('express').Response} res
 */
export async function getMilkPriceMonthByYear(req, res) {
  try {
    const { farmRepository, currencyConverter } = req.container.cradle;

    const dto = SearchFarmProductionYearSchema.parse(req.query);
    const useCase = new GetMilkPriceMonthByYear(farmRepository, currencyConverter);
    const result = await useCase.handle({
      ...dto,
      farmId: req.params.id
    });

    HttpHandler.handleSuccess({ data: result }, res);
  } catch (error) {
    HttpHandler.handleError(error, res);
  }
}