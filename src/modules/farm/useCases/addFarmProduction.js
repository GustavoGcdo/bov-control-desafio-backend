import { FarmNotFound } from "../errors/farm.errors.js";

/**
 * @typedef {import("../repositories/farm.repository.js").IFarmRepository} IFarmRepository
 */
export class AddFarmProduction {
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

    await this.#repository.addProduction({
      milkQuantity: dto.milkQuantity,
      productionDate: new Date(dto.productionDate),
      farm: found
    });
  }

}