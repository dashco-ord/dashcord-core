import { Status } from '@prisma/client';

export default function StatusColourBadge(status: Status) {
  switch (status) {
    case Status.Upcoming:
      return 'text-orange-400 border-orange-400';
    case Status.InProgress:
      return 'text-green-500 border-green-500';
    case Status.Done:
      return 'text-blue-500 border-blue-500';
  }
}
