import { TaskGrouperPipe } from './task-grouper.pipe';

const tasks = [
  {
    id: '1',
    completionDate: '04/29/2020 11:00:50',
    description: 'Mock Task 1',
    state: 'pending',
  },
  {
    id: '2',
    completionDate: '04/30/2020 11:55:50',
    description: 'Mock Task 2',
    state: 'pending',
  },
  {
    id: '3',
    completionDate: '04/28/2020 15:25:25',
    description: 'Mock Task 3',
    state: 'done',
  },
];

describe('TaskGrouperPipe', () => {
  let pipe = new TaskGrouperPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms an array of mixed tasks to an array of a specific state', () => {
    expect(pipe.transform(tasks, 'pending').length).toBe(2);
    expect(pipe.transform(tasks, 'done').length).toBe(1);
  });

  it('transforms an empty array', () => {
    expect(pipe.transform([], 'pending').length).toBe(0);
  });
});
