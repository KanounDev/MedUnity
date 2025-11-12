export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  degrees: string[];
  photo?: string;
};

export type Activity = {
  id: string;
  title: string;
  description: string;
  image?: string;
};

export type News = {
  id: string;
  title: string;
  date: string;
  content: string;
  image?: string;
};

export enum MessageStatus {
  UNREAD = 'UNREAD',
  READ = 'READ',
  ARCHIVED = 'ARCHIVED',
}
