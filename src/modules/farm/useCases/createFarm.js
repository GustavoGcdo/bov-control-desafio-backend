import { FarmAlreadyExists } from "../errors/farm.errors.js";

/**
 * @typedef {import("../repositories/farm.repository.js").IFarmRepository} IFarmRepository
 */
export class CreateFarm {
  /** @type {IFarmRepository} */
  #repository;

  /** 
  * @param {IFarmRepository} repository
  */
  constructor(repository) {
    this.#repository = repository;
  }

  async handle(dto) {
    const farmFound = await this.#repository.getByCode(dto.code);

    if (farmFound) {
      throw new FarmAlreadyExists(`farm already existing with code: ${dto.code}`);
    }

    const result = await this.#repository.create(dto);
    return result;
  }

}