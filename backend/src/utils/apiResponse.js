class ApiResponse {
  constructor(success, message, result = null) {
    this.success = success;
    this.message = message;
    this.result = result;
  }

  static success(message, result) {
    return new ApiResponse(true, message, result);
  }
  static failure(message, result) {
    return new ApiResponse(false, message, result);
  }
  static send(res, statusCode, apiResponse) {
    return res.status(statusCode).json(apiResponse);
  }
}

export default ApiResponse;
