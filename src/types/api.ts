import { Job } from './general';

export type SignupBodyData = {
  name: string;
  password: string;
  phoneNumber: number;
  email: string;
};

export type JobsResponse = {
  jobs: Job[];
  jobsCount: number;
  pagesCount: number;
};
