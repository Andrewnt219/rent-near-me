import { auth } from '@libs/firebase-sdk/firebase-sdk';
import { ChangeDobFormModel } from '@modules/account/components/ChangeDobForm/ChangeDobFormModel';
import { ChangeFullNameFormModel } from '@modules/account/components/ChangeFullNameForm/ChangeFullNameFormModel';
import { ChangeGenderFormModel } from '@modules/account/components/ChangeGenderForm/ChangeGenderFormModel';
import { ApiResult_User_Profile_PATCH } from '@pages/api/user/profile/[uid]';
import { generateDisplayName } from '@utils/string-utils';
import axios from 'axios';

export default class UserProfileService {
  static async changeName(formData: ChangeFullNameFormModel) {
    await axios.patch<ApiResult_User_Profile_PATCH>(
      `/api/user/profile/${auth.currentUser?.uid}`,
      formData
    );
    await auth.currentUser?.updateProfile({
      displayName: generateDisplayName(formData.firstName, formData.lastName),
    });
  }

  static async changeGender(formData: ChangeGenderFormModel) {
    await axios.patch<ApiResult_User_Profile_PATCH>(
      `/api/user/profile/${auth.currentUser?.uid}`,
      formData
    );
  }

  static async changeDateOfBirth(formData: ChangeDobFormModel) {
    await axios.patch<ApiResult_User_Profile_PATCH>(
      `/api/user/profile/${auth.currentUser?.uid}`,
      formData
    );
  }
}
