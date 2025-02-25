class Language {
  constructor(data) {
    this.serial = data.serial;
    this.id = data.id;
    this.name = data.name;
    this.code = data.code;
    this.isPrimary = data.isPrimary ? true : false;
    this.status = data.status;
  }
}

export default Language;
