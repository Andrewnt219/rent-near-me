import { SchemaOf } from 'yup';
import { ModelSchemaValidationError } from './errors/ModelSchemaValidationError';

export const validateModelWithSchema = async <ModeLType>(
  model: ModeLType,
  Schema: { getValidationSchema(): SchemaOf<ModeLType> }
) => {
  if (!(await Schema.getValidationSchema().isValid(model))) {
    throw new ModelSchemaValidationError(model);
  }
};
