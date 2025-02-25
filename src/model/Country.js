import Currency from './Currency';
import Language from './Language';

class Country {
  constructor(data) {
    this.serial = data.serial;
    this.id = data.id;
    this.name = data.name;
    this.isoCodeShort = data.isoCodeShort;
    this.isoCodeFull = data.isoCodeFull;
    this.dialCode = data.dialCode;
    this.languages = data.languages?.map((e) => new Language(e));
    this.currencies = data.currencies?.map((e) => new Currency(e));
    this.languageIds = this.getLanguageIds();
    this.currencyIds = this.getCurrencyIds();
    this.primaryLanguageId = this.getPrimaryLanguageId();
    this.primaryCurrencyId = this.getPrimaryCurrencyId();
    this.status = data.status;
  }

  getLanguageIds() {
    return this.languages?.map((e) => e.id);
  }
  getCurrencyIds() {
    return this.currencies?.map((e) => e.id);
  }

  getPrimaryLanguageId() {
    return this.languages?.filter((e) => e.isPrimary)[0]?.id;
  }
  getPrimaryCurrencyId() {
    return this.currencies?.filter((e) => e.isPrimary)[0]?.id;
  }
}

export default Country;
