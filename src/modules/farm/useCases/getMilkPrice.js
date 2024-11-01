import { formatToBRL, formatToUSD } from "../../../helpers/convert.js";
import { PriceCalculator } from "../entities/price-calculator.js";
import { FarmNotFound } from "../errors/farm.errors.js";

/**
 * @typedef {import("../repositories/farm.repository.js").IFarmRepository} IFarmRepository
 * @typedef {import("../service/currencyConverter.service.js").ICurrencyConverter} ICurrencyConverter
 */
export class GetMilkPrice {
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

    const result = await this.#repository.getMilkProductionMonth({
      month: dto.month,
      year: dto.year,
      farmId: dto.farmId
    });

    if(!result){
      return {
        price: {
          BRL: formatToBRL('0'),
          USD: formatToUSD('0')
        }
      };
    }

    const BRLPrice = PriceCalculator.calculateMonthPrice({
      month: dto.month,
      volumeMes: result.monthlyTotal,
      distanciaEmKM: farmFound.distanceFromFactory
    })

    const USDRate = await this.#convertService.getUSDRate();
    const USDPrice = await this.#convertService.convertBRL(BRLPrice, USDRate);

    return {
      price: {
        BRL: formatToBRL(BRLPrice),
        USD: formatToUSD(USDPrice)
      }
    };
  }


}