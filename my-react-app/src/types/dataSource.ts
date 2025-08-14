export interface DataSource {
  dataSourceId: number;
  type: string;
  name?: string;
  status?: string;
  from?: string | Date | null;
  to?: string | Date | null;
  duration?: string;
  fileSize?: number;
  records?: number;
  uploadedTime?: string | Date | null;
  uploaderUser?: string;
}