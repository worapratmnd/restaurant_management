class AppError extends Error {
  code: number;
  data: any;

  // eslint-disable-next-line @typescript-eslint/space-before-function-paren
  constructor(message: string | undefined, code: number, data: any) {
    super(message);
    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;
    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);
    // You can use any additional properties you want.
    // I'm going to use preferred HTTP status for this error types.
    // `500` is the default value if not specified.
    this.code = code || 500;
    this.data = data || null;
  }
}

export default AppError;
