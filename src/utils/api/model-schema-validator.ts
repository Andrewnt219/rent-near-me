import { SchemaOf } from 'yup';

export class ModelSchemaValidationError<ModeLType> extends Error {
  model: ModeLType;

  constructor(model: ModeLType, message?: string) {
    super(message);
    this.model = model;
  }
}

export const validateModelWithSchema = async <ModeLType>(
  model: ModeLType,
  Schema: { getValidationSchema(): SchemaOf<ModeLType> }
) => {
  if (!(await Schema.getValidationSchema().isValid(model))) {
    throw new ModelSchemaValidationError(model);
  }
};
