export type SummarySuccessResponse = {
  success: true;
  extractable: true;
  summary: string;
  tags: string[];
  category: string;
};

export type SummaryFailureResponse = {
  success: false;
  extractable: false;
  reason: "NO_TEXT" | "UNSUPPORTED_FILE_TYPE" | "UNKNOWN";
  message: string;
};

export type SummaryResponse = SummarySuccessResponse | SummaryFailureResponse;
