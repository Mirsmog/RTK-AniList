import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';
import type { RefObject } from 'react';
import { useState, useEffect } from 'react';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// use-is-iframe-loaded.hook.ts

export const useIsIFrameLoaded = (iframeRef: RefObject<HTMLIFrameElement>): boolean => {
  const [isIFrameLoaded, setIsIFrameLoaded] = useState<boolean>(false);

  const iframeCurrent = iframeRef.current;

  useEffect(() => {
    iframeCurrent?.addEventListener('load', () => setIsIFrameLoaded(true));

    return () => {
      iframeCurrent?.removeEventListener('load', () => setIsIFrameLoaded(true));
    };
  }, [iframeCurrent]);

  return isIFrameLoaded;
};
