import { Events, Experience } from '@prisma/client';

export interface ModifiedEventType extends Events {
  Student: {
    name: string;
    year: string;
    section: string;
    department: string;
  };
}

export interface ModifiedExperienceType extends Experience {
  Student: {
    name: string;
    year: string;
    section: string;
    department: string;
  };
}
