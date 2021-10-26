export class ModelSchemaValidationError<ModeLType> extends Error {
  model: ModeLType;

  constructor(model: ModeLType, message?: string) {
    super(message);
    this.model = model;
  }
}
