import { Statistics } from '@features/providers/components/admin/Statistics';
export type ProviderShort = {
  id: string;
  title: string;
};

export type ProviderFull = {
  id: number;
  name: string;
  url: string;
  coverUrl?: string;
  description: string;
};

export type CoursesShort = {
  id: number;
  title: string;
  providerId: number;
};

export type StatisticsUnique = {
  courseId: number;
  transitionsCount: number;
};
