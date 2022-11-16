import { Comments, Student } from '@prisma/client';
import { ModifiedEventType, ModifiedExperienceType } from './interfaces';

export type EventPageProps = {
  event: ModifiedEventType;
};

export type EventsPageProps = {
  upcoming: ModifiedEventType[];
  ongoing: ModifiedEventType[];
  concluded: ModifiedEventType[];
};

export type EventsComponentsProps = {
  events: ModifiedEventType[];
  forAdmin: boolean;
};

export type CommentsComponentProps = {
  comments: Comments[];
  experienceID: String;
  userEmail: string;
};

export type ExperiencePageProps = {
  experience: ModifiedExperienceType;
  user: Student;
  comments: Comments;
};
