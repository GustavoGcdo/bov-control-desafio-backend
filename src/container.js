import { asClass, createContainer } from 'awilix';
import MongoDBFarmRepository from './infra/repositories/mongoDBFarm.repository.js';
import { APICurrencyConverter } from './infra/service/apiCurrencyConverter.service.js';

const container = createContainer();

container.register({
  farmRepository: asClass(MongoDBFarmRepository).singleton(),
  currencyConverter: asClass(APICurrencyConverter).singleton(),
});

export default container;
