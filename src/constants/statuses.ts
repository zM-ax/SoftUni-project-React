export const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
} as const;

export type StatusType = typeof STATUS[keyof typeof STATUS];