import Paginate from './Paginate';

class PaginatedResponse {
  constructor(data, ItemClass) {
    this.items = data?.content.map(
      (item, index) =>
        new ItemClass({ ...item, serial: this.getSerial(index, data) }),
    );
    this.paginate = new Paginate(data);
  }

  getSerial(index, data) {
    return index + 1 + data.number * data.size;
  }
}

export default PaginatedResponse;
