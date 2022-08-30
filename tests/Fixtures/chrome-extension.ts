import { test as base, chromium } from "@playwright/test";

export type ChromeExtensionOptions = {
  chromeExtensions: {
    paths: Array<string>;
    userDataDir?: string;
  };
};

export const test = base.extend<ChromeExtensionOptions>({
  chromeExtensions: [{ paths: [] }, { option: true }],
  context: [
    async ({ chromeExtensions }, use) => {
      const { paths, userDataDir = "/Users/vanessakelly/Library/Application Support/Google/Chrome/Profile 2/Extensions" } = chromeExtensions;
      const launchOptions = {
        headless: false,
        args:
          paths.length === 0
            ? []
            : [
                `--disable-extensions-except=${paths.join(",")}`,
                ...paths.map((path) => `--load-extension=${path}`),
              ],
      };
      const context = await chromium.launchPersistentContext(
        userDataDir,
        launchOptions
      );
      await use(context);
      await context.close();
    },
    { scope: "test", timeout: 0 },
    //                        ^
    //                        The default timeout is 30s.
  ],
});