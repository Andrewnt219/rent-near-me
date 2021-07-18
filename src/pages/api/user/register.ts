import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@libs/supabase';
import RegisterForm from '@models/RegisterForm';
import { ResultSuccess, ResultError, Result } from '@utils/api-responses';
import { handleHttpMethod } from '@utils/api/http-method-handler';
import { Session } from '@supabase/supabase-js';

type PostResponseData = {
  session: Session | null;
};
export type ApiPostResult_UserRegister = ResultSuccess<PostResponseData>;
async function post(
  req: NextApiRequest,
  res: NextApiResponse<Result<PostResponseData>>
) {
  const model = new RegisterForm(req.body);
  const isValid = await RegisterForm.getValidationSchema().isValid(model);
  if (!isValid) {
    return res
      .status(422)
      .json(new ResultError('common:errors.api.invalid-schema'));
  }
  const signUpResult = await supabase.auth.signUp({
    email: model.email,
    password: model.password,
  });
  if (signUpResult.error) throw signUpResult.error;
  const insertProfileResult = await supabase.from('profiles').insert({
    id: signUpResult.user?.id,
    firstName: model.firstName,
    lastName: model.lastName,
    gender: model.gender,
    dob: model.dob,
  });
  if (insertProfileResult.error) throw insertProfileResult.error;
  return res.json(
    new ResultSuccess({
      session: signUpResult.session,
    })
  );
}

export default handleHttpMethod({ post });
