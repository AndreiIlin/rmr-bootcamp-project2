import { CurrentUserRoles } from '@features/auth';

export type UserInfoFull = {
  id: number;
  email: string;
  name?: string;
  role: CurrentUserRoles;
};

export type UserProfileFull = {
  id: number;
  email: string;
  role: CurrentUserRoles;
  name?: string;
  surname?: string;
  isConfirmed: boolean;
  registeredAt: string;
  archivedAt: string;
  userId: number;
  professionId?: number;
};

export type UserStudyInfo = {
  courseFinished: boolean;
  courseTitle: string;
  email: string;
  finishedAt: string;
  professions: string[];
  score: number;
  userInfoNameAndSurname: string;
};
