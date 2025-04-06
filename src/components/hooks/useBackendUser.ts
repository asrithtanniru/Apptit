// hooks  
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface BackendUserState {
  id: number | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export function useBackendUser(): BackendUserState {
  const { data: session, status } = useSession();
  const [backendUser, setBackendUser] = useState<BackendUserState>({
    id: null,
    isLoading: true,
    isAuthenticated: false,
    error: null
  });

  useEffect(() => {
    if (status === 'loading') {
      setBackendUser({
        id: null,
        isLoading: true,
        isAuthenticated: false,
        error: null
      });
      return;
    }

    if (status === 'unauthenticated') {
      setBackendUser({
        id: null,
        isLoading: false,
        isAuthenticated: false,
        error: 'Not authenticated'
      });
      return;
    }


    const backendId = session?.user?.backendId;

    if (backendId) {
      setBackendUser({
        id: backendId,
        isLoading: false,
        isAuthenticated: true,
        error: null
      });
      return;
    }


    const localStorageId = localStorage.getItem('backendUserId');

    if (localStorageId) {
      setBackendUser({
        id: parseInt(localStorageId),
        isLoading: false,
        isAuthenticated: true,
        error: null
      });
      return;
    }

    setBackendUser({
      id: null,
      isLoading: false,
      isAuthenticated: true,
      error: 'No backend ID found'
    });
  }, [session, status]);

  return backendUser;
}
