import assert from 'node:assert';
import { describe, test } from 'node:test';
import { GetMilkPrice } from '../src/modules/farm/useCases/getMilkPrice.js';
import { IFarmRepository } from '../src/modules/farm/repositories/farm.repository.js';
import { ICurrencyConverter } from '../src/modules/farm/service/currencyConverter.service.js';

class FakeRepository extends IFarmRepository {
  async getById() {
    return {
      _id: '6723f705c53a6e335aea12af',
      name: 'Fazenda da Dona Elia',
      code: 'faz-dona-elia',
      distanceFromFactory: 1000,
      farmers: [{ name: 'Elia', phone: '4002-8922' }]
    }
  }

  async getMilkProductionMonth() {
    return {
      monthlyTotal: 15000
    }
  }
}

class FakeConverter extends ICurrencyConverter {
  getUSDRate(){
    return 0.17374;
  }

  convertBRL(BRLPrice, rate) {
    return BRLPrice * rate;
  }
}

describe('Teste usecase getMilkPrice', () => {

  test('Dado um valor total de 15.000L mensais no mes 10 a uma distancia de 1000km, espera-se que o valor em BRL e USD esteja correto', async () => {
    const repository = new FakeRepository();

    const service = new FakeConverter();

    const useCase = new GetMilkPrice(repository, service)
    const result = await useCase.handle({
      farmId: 'idfake',
      month: 10,
      year: 2024
    });



    assert.equal(result.price.BRL, 'R$ 29.340,00');
    assert.equal(result.price.USD, '$5,097.53');
  });
  
})