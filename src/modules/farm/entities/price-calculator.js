export class PriceCalculator {

  static calculateMonthPrice(resumeMonth) {
    const { month, volumeMes, distanciaEmKM } = resumeMonth;

    const FIRST_PERIOD_PRICE = 1.80;
    const SECOND_PERIOD_PRICE = 1.95;
    const PRICE_FOR_50KM = 0.05;
    const PRICE_FOR_GREATHER_50KM = 0.06;
    const BONUS_BY_PRODUCTION = 0.01;


    let basePrice = FIRST_PERIOD_PRICE;
    if (month > 5) {
      basePrice = SECOND_PERIOD_PRICE;
    }

    let coustByKM = PRICE_FOR_50KM;
    if (distanciaEmKM > 50) {
      coustByKM = PRICE_FOR_GREATHER_50KM
    }

    let productionBonus = 0;
    if (month > 5 && volumeMes > 10_000) {
      productionBonus = BONUS_BY_PRODUCTION;
    }


    const price = (volumeMes * basePrice) - (coustByKM * distanciaEmKM) + (productionBonus * volumeMes);

    return price;

  }
}