import {useCallback, useEffect, useRef, useState} from 'react'

const useIsMounted = () => {
  const ref = useRef<boolean>(false)
  const [, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    ref.current = true
    setIsMounted(true)
    return () => {
      ref.current = false
    };
  }, [])

  return useCallback(() => {
    return ref.current;
  }, [ref]);
};

export default useIsMounted;