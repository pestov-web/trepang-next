export type RequestState = { success: boolean; message: string; errors?: { name?: string[]; telephone?: string[] } };
export const initialRequestState: RequestState = { success: false, message: "" };
