import { ICurrencyConverter } from "../../modules/farm/service/currencyConverter.service.js";

export class APICurrencyConverter extends ICurrencyConverter {

  async getUSDRate() {
    const url = 'https://api.frankfurter.app/latest?from=BRL&to=USD';
    const response = await fetch(url);
    const data = await response.json();
    const exchangeRate = data.rates.USD;
    return exchangeRate;
  }

  async convertBRL(BRLPrice, exchangeRate) {
    const USDPrice = BRLPrice * exchangeRate;
    return USDPrice;
  }

}