import { Context } from '../utils';

export const Task = {
  author: ({ id }, args, ctx: Context) => {
    return ctx.prisma.task({ id }).author();
  },
};
