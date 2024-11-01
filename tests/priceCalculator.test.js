import assert from 'node:assert';
import { describe, test } from 'node:test';
import { PriceCalculator } from '../src/modules/farm/entities/price-calculator.js';

describe('Calculo do preço do litro de leite pago ao fazendeiro', () => {

  test('Dado uma produção de 1.000L, em um mes entre (JAN a JUN), distancia de 50Km', () => {
    const resumeMonth = {
      month: new Date('01-10-2024').getMonth(),
      volumeMes: 1_000,
      distanciaEmKM: 50
    }

    const price = PriceCalculator.calculateMonthPrice(resumeMonth);
    assert.equal(price, 1797.5);
  });

  test('Dado uma produção de 1.000L, em um mes entre (JUL a DEZ), distancia de 50Km', () => {
    const resumeMonth = {
      month: new Date('07-10-2024').getMonth(),
      volumeMes: 1_000,
      distanciaEmKM: 50
    }

    const price = PriceCalculator.calculateMonthPrice(resumeMonth);
    assert.equal(price, 1947.5);
  });

  test('Dado uma produção de 1.000L, em um mes entre (JAN a JUN), distancia de 70Km', () => {
    const resumeMonth = {
      month: new Date('02-10-2024').getMonth(),
      volumeMes: 1_000,
      distanciaEmKM: 70
    }

    const price = PriceCalculator.calculateMonthPrice(resumeMonth);
    assert.equal(price, 1795.8);
  });

  test('Dado uma produção de 1.000L, em um mes entre (JUL a DEZ), distancia de 70Km', () => {
    const resumeMonth = {
      month: new Date('07-10-2024').getMonth(),
      volumeMes: 1_000,
      distanciaEmKM: 70
    }

    const price = PriceCalculator.calculateMonthPrice(resumeMonth);
    assert.equal(price, 1945.8);
  });

  test('Dado uma produção de 15.000L (Com bonus), em um mes entre (JUL a DEZ), distancia de 50Km', () => {
    const resumeMonth = {
      month: new Date('07-10-2024').getMonth(),
      volumeMes: 15_000,
      distanciaEmKM: 50
    }

    const price = PriceCalculator.calculateMonthPrice(resumeMonth);
    assert.equal(price, 29397.5);
  });

  test('Dado uma produção de 15.000L, em um mes entre (JAN a JUN), distancia de 50Km', () => {
    const resumeMonth = {
      month: new Date('04-10-2024').getMonth(),
      volumeMes: 15_000,
      distanciaEmKM: 50
    }

    const price = PriceCalculator.calculateMonthPrice(resumeMonth);
    assert.equal(price, 26997.5);
  });

  test('Dado uma produção de 15.000L, em um mes entre (JAN a JUN), distancia de 1000Km', () => {
    const resumeMonth = {
      month: new Date('04-10-2024').getMonth(),
      volumeMes: 15_000,
      distanciaEmKM: 1000
    }

    const price = PriceCalculator.calculateMonthPrice(resumeMonth);
    assert.equal(price, 26940.0);
  });


  test('Dado uma produção de 15.000L, em um mes entre (JUL a DEZ), distancia de 1000Km', () => {
    const resumeMonth = {
      month: new Date('12-10-2024').getMonth(),
      volumeMes: 15_000,
      distanciaEmKM: 1000
    }

    const price = PriceCalculator.calculateMonthPrice(resumeMonth);
    assert.equal(price, 29340.0);
  });
  
});
