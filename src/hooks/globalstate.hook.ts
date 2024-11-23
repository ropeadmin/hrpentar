import { useAppSelector } from '@/store';
import { profileLogoutAction, ProfileState } from '@/store/profile.slice';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

interface IGlobalState {
  profile: ProfileState;
  isAuthenticated: boolean;
  logout: any;
}

const useGlobalState = (): IGlobalState => {
  const router = useRouter();
  const dispatch = useDispatch();
  const profile = useAppSelector(
    (state: { profile: any }) => state.profile
  ) as ProfileState;
  const isAuthenticated = !!profile?.accessToken;

  const logout = () => {
    profile?.account?.role === 'EMPLOYEE'
      ? router.push('/employee/signin')
      : router.push('/auth/signin');

    dispatch(profileLogoutAction());
  };

  return { profile, isAuthenticated, logout };
};

export default useGlobalState;
