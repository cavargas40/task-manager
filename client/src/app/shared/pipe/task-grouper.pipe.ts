import { Pipe, PipeTransform } from '@angular/core';
import { Task } from 'app/data/schema/task';

@Pipe({
  name: 'taskGrouper'
})
export class TaskGrouperPipe implements PipeTransform {

  transform(value: Array<Task>, ...args: Array<unknown>): Array<Task> {

    const [ state ] = args;

    if(value.length) {
      return value.filter(task => task.state === state);
    }

    return value;
  }
}
