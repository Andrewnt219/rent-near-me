import Profile from '@models/api/entities/Profile/Profile';
import { ApiResult_User_Profile_GET } from '@pages/api/user/profile/[uid]';
import { updateResponseData } from '@utils/api-responses';
import { isNullOrUndefined } from '@utils/validate-js-utils';
import { useMemo } from 'react';
import useSWR from 'swr';
import { useAuth } from '../contexts/AuthContext';

type TUserUserProfile = {
  isProfileReady: boolean;
  profile: Profile | undefined;
  mutateProfile: (
    mergeData?: Profile,
    shouldRevalidation?: boolean
  ) => Promise<Profile | undefined>;
};

export const useUserProfile = (): TUserUserProfile => {
  const { user } = useAuth();

  const {
    data: profileResponse,
    mutate: mutateProfileResponse,
    isValidating: isValidating,
  } = useSWR<ApiResult_User_Profile_GET>(
    user ? `/api/user/profile/${user.uid}` : null,
    { revalidateIfStale: false }
  );

  return useMemo(
    () => ({
      isProfileReady: !isNullOrUndefined(profileResponse) || !isValidating,
      profile: profileResponse?.data,
      mutateProfile: async (mergeData?, shouldRevalidate?) => {
        const newRes = await mutateProfileResponse(
          mergeData && ((res) => updateResponseData(res, mergeData)),
          shouldRevalidate
        );
        return newRes?.data;
      },
    }),
    [isValidating, mutateProfileResponse, profileResponse]
  );
};
