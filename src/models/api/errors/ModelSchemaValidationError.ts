export class ModelSchemaValidationError<ModelType> extends Error {
  model: ModelType;

  constructor(model: ModelType, message?: string) {
    super(message);
    this.model = model;
  }
}
