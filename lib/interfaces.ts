import { Events } from '@prisma/client';

export interface ModifiedEventType extends Events {
  Student: {
    name: string;
    year: string;
    section: string;
    department: string;
  };
}
