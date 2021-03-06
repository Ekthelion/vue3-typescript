export interface GrudgeType {
  id: number;
  title: string;
  forgiven?: boolean;
  when?: number | undefined;
}
export interface ForgivePayload {
  id: number;
  forgiven: boolean;
}
