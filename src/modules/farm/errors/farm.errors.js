export class FarmAlreadyExists extends Error {
  /**   
   * @param {string} message
   */
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class FarmNotFound extends Error {
  /**   
   * @param {string} message
   */
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class FarmIDInvalidError extends Error {
  /**   
   * @param {string} message
   */
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}