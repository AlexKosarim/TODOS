import { useState, useCallback, useEffect } from 'react';
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem
} from '../utils/storage';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  // const [userId, setUserId] = useState(null);

  const login = useCallback(async (jwtToken /*, id */) => {
    setToken(jwtToken);
    // setUserId(id);
    await setStorageItem('token', jwtToken);
    // await removeStorageItem('token');
    setReady(true);
  }, []);

  const logout = useCallback(async () => {
    setToken(null);
    // setUserId(null);

    await removeStorageItem('token');
  }, []);

  useEffect(() => {
    const getValue = async () => {
      const storedToken = await getStorageItem('token');
      if (storedToken != null) {
        login(storedToken /*, data.userId */);
      }
      setReady(true);
    };
    getValue();
    // logout();
  }, [login]);

  return { login, logout, token /*, userId*/, ready };
};
