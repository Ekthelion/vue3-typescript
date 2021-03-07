export interface GrudgeType {
  id: string;
  title: string;
  forgiven?: boolean;
  when?: number | undefined;
}
export interface ForgivePayload {
  id: string;
  forgiven: boolean;
}
