import { SchemaOf } from 'yup';
import { ModelSchemaValidationError } from '@models/api/errors/ModelSchemaValidationError';

export const validateModelWithSchema = async <ModelType>(
  model: ModelType,
  Schema: SchemaOf<ModelType>
) => {
  if (!(await Schema.isValid(model))) {
    throw new ModelSchemaValidationError(model);
  }
};
