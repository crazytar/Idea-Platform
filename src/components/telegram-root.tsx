
import { type PropsWithChildren, useEffect, useRef, useState } from 'react';
import {
  // initData,
  miniApp,
  retrieveLaunchParams,
  useLaunchParams,
  useSignal,
} from '@telegram-apps/sdk-react';
import {
  backButton,
  viewport,
  themeParams,
  initData,
  $debug,
  init,
} from '@telegram-apps/sdk-react';
import { mockTelegram } from '@/lib/mockTelegram';
// import { AppRoot } from '@telegram-apps/telegram-ui';


export interface TelegramRootProps {
  children?: React.ReactNode;
}
export function TelegramRoot({ children }: TelegramRootProps) {
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development';//in client no access to it? Yes
    // Mock Telegram environment in development mode if needed.
    console.log('NODE_ENV:', process.env.NODE_ENV);
    if (isDev) {
      mockTelegram();
    }


    async function initTelega(debug: boolean) {
      $debug.set(debug);
      try {
        init();
        await miniApp.ready();
        backButton.mount.isAvailable() && backButton.mount();
        //The isAvailable() method verifies if the function is currently available and can be safely called.
        backButton.show.ifAvailable()
        const off = backButton.onClick(() => {
          off();
          window.history.back();
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
      // miniApp.mount();
      // themeParams.mount();
      // initData.restore();
      // void viewport.mount().then(() => {
      //   viewport.bindCssVars();
      // }).catch(e => {
      //   console.error('Something went wrong mounting the viewport', e);
      // });
    }
    try {
      initTelega(isDev);
      setInitialized(true);
    } catch (error) {
      setInitialized(false);
    }
  }, [])

  if (initialized) {
    const lp = retrieveLaunchParams();
    console.log('launch params: ', lp);
  }

  return (
    <>
      {initialized && children}
    </>
    // <AppRoot
    //   appearance={isDark ? 'dark' : 'light'}
    //   platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    // >
    //   {children}
    // </AppRoot>
  );
}

