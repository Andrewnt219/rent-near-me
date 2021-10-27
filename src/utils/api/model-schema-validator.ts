import { SchemaOf } from 'yup';
import { ModelSchemaValidationError } from '@models/api/errors/ModelSchemaValidationError';

export const validateModelWithSchema = async <ModeLType>(
  model: ModeLType,
  Schema: SchemaOf<ModeLType>
) => {
  if (!(await Schema.isValid(model))) {
    throw new ModelSchemaValidationError(model);
  }
};
