import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string): string {
    if (!value) return '';

    const date = value instanceof Date ? value : new Date(value);
    const now = new Date();
    const secondsPast = (now.getTime() - date.getTime()) / 1000;

    if (secondsPast < 60) return 'just now';
    if (secondsPast < 3600) {
      const minutes = Math.floor(secondsPast / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    if (secondsPast < 86400) {
      const hours = Math.floor(secondsPast / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    if (secondsPast < 2592000) {
      const days = Math.floor(secondsPast / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }

    return date.toLocaleDateString();
  }
}