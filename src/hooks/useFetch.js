import { useState, useEffect, useCallback, useRef } from 'react';

export function useFetch(asyncFn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const isMounted = useRef(true);

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const result = await asyncFn();
      if (!isMounted.current) return;
      if (result.error) {
        setState({ data: null, loading: false, error: result.error });
      } else {
        setState({ data: result.data, loading: false, error: null });
      }
    } catch (err) {
      if (!isMounted.current) return;
      setState({ data: null, loading: false, error: err.message || 'Error inesperado.' });
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    isMounted.current = true;
    execute();
    return () => {
      isMounted.current = false;
    };
  }, [execute]);

  return { ...state, refetch: execute };
}