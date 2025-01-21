import {
  backButton,
  viewport,
  themeParams,
  miniApp,
  initData,
  $debug,
  init,
} from '@telegram-apps/sdk-react';

/**
 * Initializes the application and configures its dependencies.
 */
export async function initTelega(debug: boolean) {
  // Set @telegram-apps/sdk-react debug mode.
  $debug.set(debug);

  // Initialize special event handlers for Telegram Desktop, Android, iOS, etc.
  // Also, configure the package.
  try {
    init();
    await miniApp.ready();
  } catch (error) {
    console.log(error);

  }

  // Mount all components used in the project.
  // miniApp.mount();
  // themeParams.mount();
  // initData.restore();
  // void viewport.mount().then(() => {
  //   viewport.bindCssVars();
  // }).catch(e => {
  //   console.error('Something went wrong mounting the viewport', e);
  // });

  backButton.mount.isAvailable() && backButton.mount();
  backButton.show.ifAvailable()
  const off = backButton.onClick(() => {
    off();
    window.history.back();
  });
  // Define components-related CSS variables.
  // miniApp.bindCssVars();
  // themeParams.bindCssVars();

  // Add Eruda if needed.
  // debug && import('eruda')
  //   .then((lib) => lib.default.init())
  //   .catch(console.error);
}