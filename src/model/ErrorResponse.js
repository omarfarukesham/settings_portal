class ErrorResponse {
  constructor(data) {
    this.code = data.code;
    this.status = data.status;
    this.message = data.message;
  }
}
export default ErrorResponse;
