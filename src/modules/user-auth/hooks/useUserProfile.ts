import Profile from '@models/api/entities/Profile/Profile';
import { ApiResult_User_Profile_GET } from '@pages/api/user/profile/[uid]';
import { updateResponseData } from '@utils/api-responses';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { useAuth } from '../contexts/AuthContext';

type TUserUserProfile = {
  isProfileReady: boolean;
  profile: Profile | null;
  mutateProfile: (
    mergeData?: Profile,
    shouldRevalidation?: boolean
  ) => Promise<Profile | null>;
};

const useUserProfile = (): TUserUserProfile => {
  const { user } = useAuth();

  const {
    data: profileResponse,
    mutate: mutateProfileResponse,
    isValidating,
  } = useSWR<ApiResult_User_Profile_GET>(
    user ? `/api/user/profile/${user.uid}` : null
  );

  const [profile, setPrfile] = useState<Profile | null>();
  useEffect(() => {
    if (profileResponse || !isValidating) {
      setPrfile(profileResponse?.data ?? null);
    }
  }, [isValidating, profileResponse]);

  return useMemo(
    () => ({
      isProfileReady: profile !== undefined,
      profile: profile ?? null,
      mutateProfile: async (mergeData?, shouldRevalidate?) => {
        const newRes = await mutateProfileResponse(
          mergeData && ((res) => updateResponseData(res, mergeData)),
          shouldRevalidate
        );
        return newRes?.data ?? null;
      },
    }),
    [mutateProfileResponse, profile]
  );
};

export default useUserProfile;
