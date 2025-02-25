class Paginate {
  constructor(data) {
    this.perPage = data.size;
    this.totalPages = data.totalPages ? data.totalPages : 1;
    this.totalElements = data.totalElements;
    this.last = data.last;
    this.first = data.first;
  }
}

export default Paginate;
