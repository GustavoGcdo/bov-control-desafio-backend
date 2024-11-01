import { formatToBRL, formatToUSD } from "../../../helpers/convert.js";
import { PriceCalculator } from "../entities/price-calculator.js";
import { FarmNotFound } from "../errors/farm.errors.js";

/**
 * @typedef {import("../repositories/farm.repository.js").IFarmRepository} IFarmRepository
 * @typedef {import("../service/currencyConverter.service.js").ICurrencyConverter} ICurrencyConverter
 */
export class GetMilkPriceMonthByYear {
  /** @type {IFarmRepository} */
  #repository
  /** @type {ICurrencyConverter} */
  #convertService

  /** 
  * @param {IFarmRepository} repository
  * @param {ICurrencyConverter} convertService
  */
  constructor(repository, convertService) {
    this.#repository = repository;
    this.#convertService = convertService;
  }


  async handle(dto) {
    const farmFound = await this.#repository.getById(dto.farmId);

    if (!farmFound) {
      throw new FarmNotFound();
    }

    const results = await this.#repository.getMilkProductionMonthByYear({
      year: dto.year,
      farmId: dto.farmId
    });

    const USDRate = await this.#convertService.getUSDRate();
    const calculatedMonthResume = [];
    for (const monthResume of results) {
      const monthNumber = Number(monthResume.month.split('-').pop() - 1);

      const BRLPrice = PriceCalculator.calculateMonthPrice({
        month: monthNumber,
        volumeMes: monthResume.monthTotal,
        distanciaEmKM: farmFound.distanceFromFactory
      })

      const USDPrice = await this.#convertService.convertBRL(BRLPrice, USDRate);

      calculatedMonthResume.push({
        month: monthResume.month,
        price: {
          BRL: formatToBRL(BRLPrice),
          USD: formatToUSD(USDPrice)
        }
      });
    }


    return calculatedMonthResume;
  }

}