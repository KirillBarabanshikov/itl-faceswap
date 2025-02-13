declare global {
  interface Window {
    API_URL: string;
    DEVICE_ID: string;
    INACTIVITY_TIMEOUT: number;
    TIMER: number;
    TG_BOT_NAME: string;
    TG_BOT_CODE: string;
  }
}

export {};
