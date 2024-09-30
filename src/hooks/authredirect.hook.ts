import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '../store';

interface AuthRedirectOptions {
  watch?: boolean;
}

const useAuthRedirect = ({ watch = false }: AuthRedirectOptions = {}) => {
  const router = useRouter();
  const accessToken = useAppSelector((state) => state.profile.accessToken);
  
  // Memoize the authentication status to avoid unnecessary recalculations
  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  // Only watch authentication status if `watch` is true
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    } else {
      router.replace('/auth/signin');
    }
  }, [isAuthenticated, router, watch]);

  return isAuthenticated;
};

export default useAuthRedirect;
