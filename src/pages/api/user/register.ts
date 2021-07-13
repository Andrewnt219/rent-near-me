import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@libs/supabase';
import RegisterForm from '@models/RegisterForm';
import { ResultSuccess, ResultError, Result } from '@utils/api-responses';
import { handleHttpMethod } from '@utils/api/http-method-handler';

async function post(req: NextApiRequest, res: NextApiResponse<Result>) {
  const model = new RegisterForm(req.body);
  const isValid = await RegisterForm.getValidationSchema().isValid(model);
  if (!isValid) {
    return res.status(400).json(new ResultError('Invalid schema'));
  }
  const {
    user,
    session,
    error: signUpError,
  } = await supabase.auth.signUp({
    email: model.email,
    password: model.password,
  });
  if (signUpError) throw signUpError;
  const {
    data,
    status,
    error: dbError,
  } = await supabase.from('profiles').insert({
    id: user?.id,
    firstName: model.firstName,
    lastName: model.lastName,
    gender: model.gender,
    dob: model.dob,
  });
  if (dbError) throw dbError;
  return res.json(new ResultSuccess({ user, session, data, status }));
}

export default handleHttpMethod({ post });
