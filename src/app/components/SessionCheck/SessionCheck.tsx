import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import useGlobalState from '@/hooks/globalstate.hook';
import { profileLogoutAction } from '@/store/profile.slice';
import { useSnackbar } from 'notistack';

const useSessionCheck = () => {
    const dispatch = useDispatch();
    const { profile, isAuthenticated } = useGlobalState();
    const token = profile?.jwt;
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const logout = () => {
        dispatch(profileLogoutAction());
    };

    useEffect(() => {
        if (token) {
            if (jwtDecode<{ exp: number }>(token).exp < Date.now() / 1000) {
                logout();
                enqueueSnackbar("Your session has expired due to inactivity. Please log in again to continue.", {
                    variant: 'rope_snackbar',
                    autoHideDuration: 5000,
                    info: true
                });
                router.push('/');
            }
        } else {
            // enqueueSnackbar("Access Denied: You must be logged in to view this page. Please log in to continue.", {
            //     variant: 'rope_snackbar',
            //     autoHideDuration: 5000,
            //     error: true
            // });
            router.push('/');
        }
    }, [token]);

    return null;
};

export default useSessionCheck;
