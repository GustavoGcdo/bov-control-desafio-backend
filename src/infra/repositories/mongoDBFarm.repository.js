import { ObjectId } from "mongodb";
import { getDB } from "../../config/database.js";
import { IFarmRepository } from "../../modules/farm/repositories/farm.repository.js";
import { FarmIDInvalidError } from "../../modules/farm/errors/farm.errors.js";

/**
  * @typedef {import("mongodb").Collection} Collection
*/
class MongoDBFarmRepository extends IFarmRepository {

  constructor() {
    super();
    /** @type {Collection} */
    this.collectionFarm = getDB().collection('farms');
    /** @type {Collection} */
    this.collectionFarmProduction = getDB().collection('farm-productions');
  }

  async create(farm) {
    const result = await this.collectionFarm.insertOne(farm);
    if (result.insertedId) {
      const insertedItem = await this.collectionFarm.findOne({ _id: result.insertedId });
      return insertedItem;
    }
  }

  async getByCode(farmCode) {
    const result = await this.collectionFarm.findOne({ code: farmCode });
    return result;
  }


  async getById(farmId) {
    if (!ObjectId.isValid(farmId)) {
      throw new FarmIDInvalidError('invalid farm id provided');
    }
    const result = await this.collectionFarm.findOne({ _id: ObjectId.createFromHexString(farmId) });
    return result;
  }

  async addProduction(farmProduction) {
    const result = await this.collectionFarmProduction.insertOne(farmProduction);
    if (result.insertedId) {
      const insertedItem = await this.collectionFarmProduction.findOne({ _id: result.insertedId });
      return insertedItem;
    }
  }

  async getMilkSummaryProductionDays(searchParams) {
    const [result] = await this.collectionFarmProduction.aggregate([
      {
        $match: {
          'farm._id': ObjectId.createFromHexString(searchParams.farmId),
          $expr: {
            $and: [
              { $eq: [{ $year: "$productionDate" }, searchParams.year] },
              { $eq: [{ $month: "$productionDate" }, searchParams.month] }]
          }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$productionDate" } },
          dailyTotal: { $sum: "$milkQuantity" }
        }
      },
      {
        $group: {
          _id: null,
          summaryOfDays: {
            $push: {
              day: "$_id",
              dailyTotal: "$dailyTotal"
            }
          },
          monthlyAverage: { $avg: "$dailyTotal" }
        }
      },
      {
        $project: {
          _id: 0,
          summaryOfDays: 1,
          monthlyAverage: 1
        }
      }
    ]).toArray();


    return result;
  }


  async getMilkProductionMonth(searchParams) {
    const [result] = await this.collectionFarmProduction.aggregate([
      {
        $match: {
          'farm._id': ObjectId.createFromHexString(searchParams.farmId),
          $expr: {
            $and: [
              { $eq: [{ $year: "$productionDate" }, searchParams.year] },
              { $eq: [{ $month: "$productionDate" }, searchParams.month] }]
          }
        }
      },
      {
        $group: {
          _id: null,
          monthlyTotal: { $sum: "$milkQuantity" },
        }
      },
      {
        $project: {
          _id: 0,
          monthlyTotal: 1
        }
      }

    ]).toArray();

    // {monthlyTotal: 2132}

    return result;
  }


  async getMilkProductionMonthByYear(searchParams) {
    const results = await this.collectionFarmProduction.aggregate([
      {
        $match: {
          'farm._id': ObjectId.createFromHexString(searchParams.farmId),
          $expr: {
            $and: [{ $eq: [{ $year: "$productionDate" }, searchParams.year] }]
          }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$productionDate" } },
          monthTotal: { $sum: "$milkQuantity" }
        }
      },
      {
        $project: {
          month: "$_id",
          monthTotal: 1,
          _id: 0
        }
      }
    ]).toArray();

    return results;
  }


}

export default MongoDBFarmRepository;

