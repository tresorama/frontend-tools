import type { GlobalSettings } from "../types";

export type GlobalSettingsRemote = (
  | {
    status: 'idle',
    data?: undefined,
  }
  | {
    status: 'loading',
    data?: undefined,
  }
  | {
    status: 'success',
    data: GlobalSettings,
  }
  | {
    status: 'error',
    data?: undefined,
    errorCode: string,
    originalError?: unknown,
  }
);