import { SchemaOf } from 'yup';
import { ModelSchemaValidationError } from '@models/api/errors/ModelSchemaValidationError';

export const validateModelWithSchema = async <ModelType>(
  model: ModelType,
  Schema: SchemaOf<ModelType>,
  throwError = false
) => {
  if (!(await Schema.isValid(model))) {
    if (throwError) throw new ModelSchemaValidationError(model);
    else return false;
  }
  return true;
};
