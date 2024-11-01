export class InvalidCredentialsError extends Error {
  /**   
   * @param {string} message
   */
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}