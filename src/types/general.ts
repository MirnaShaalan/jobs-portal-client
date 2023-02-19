export type Job = {
  id: string;
  name: string;
  description: string;
  skills: string;
  category: string;
  responsibilities: string;
  startDate: Date;
  endDate: Date;
  maxApplications: number;
};

export type JobDialogData = {
  formData: Job;
  title: string;
  buttonText: string;
  action: 'add' | 'update';
};
