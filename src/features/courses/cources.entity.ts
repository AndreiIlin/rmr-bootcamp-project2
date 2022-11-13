export type CourseProfession = {
  id: string;
  name: string;
};

export type CourseShort = {
  id: string;
  title: string;
  url: string;
  coverUrl: string;
  startsAt: string;
  endsAt: string;
  provider: string;
  providerUrl: string;
  providerCoverUrl: string;
  profession: string;
};

export type CourseFull = {
  id: number;
  title: string;
  url: string;
  coverUrl: string;
  description: string;
  startsAt: string;
  endsAt: string;
  isAdvanced: boolean;
  providerId: number;
  providerName: string;
  providerUrl: string;
  providerCoverUrl: string;
  professionId: number;
  professionName: string;
  averageRating: number;
  votes: number;
  tags: string[];
};

export type CourseStudyInfo = {
  id: number;
  startsAt: string;
  endsAt: string;
  courseStudyInfoDto: {
    courseId: number;
    courseName: string;
    courseProviderName: string;
    score: number;
    professionNameSet: string[];
  };
};
