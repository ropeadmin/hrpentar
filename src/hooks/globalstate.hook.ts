import { useAppSelector } from '@/store';
import { profileLogoutAction, ProfileState } from '@/store/profile.slice';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';


interface IGlobalState {
  profile: ProfileState;
  isAuthenticated: boolean;
  hasStore: boolean;
  logout: any;
}

const useGlobalState = (): IGlobalState => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const profile = useAppSelector((state: { profile: any; }) => state.profile) as ProfileState;
  const isAuthenticated = !!profile?.token;
  const hasStore = !!profile?.user?.merchStore?.id;

  const logout = () => {
    dispatch(profileLogoutAction());
    enqueueSnackbar("You're Logged Out, But your Store isn't! 😃", {
      variant: 'rope_snackbar',
      autoHideDuration: 5000,
    });
    router.push('/');
  };

  return { profile, isAuthenticated, logout, hasStore };
};

export default useGlobalState;
