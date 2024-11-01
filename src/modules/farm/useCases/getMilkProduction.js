import { FarmNotFound } from "../errors/farm.errors.js";

/**
 * @typedef {import("../repositories/farm.repository.js").IFarmRepository} IFarmRepository
 */
export class GetMilkProduction {
  /** @type {IFarmRepository} */
  #repository

  /** 
  * @param {IFarmRepository} repository
  */
  constructor(repository) {
    this.#repository = repository;
  }


  async handle(dto) {
    const found = await this.#repository.getById(dto.farmId);

    if (!found) {
      throw new FarmNotFound();
    }

    const result = await this.#repository.getMilkSummaryProductionDays({
      month: dto.month,
      year: dto.year,
      farmId: dto.farmId
    });

    return result;
  }

}