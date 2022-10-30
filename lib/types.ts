import { ModifiedEventType } from './interfaces';

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
