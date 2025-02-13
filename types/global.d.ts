declare global {
  interface Window {
    API_URL: string;
    DEVICE_ID: string;
    INACTIVITY_TIMEOUT: number;
    TIMER: number;
  }
}

export {};
