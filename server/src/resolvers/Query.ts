import { getUserId, Context } from '../utils';

export const Query = {
  tasks(parent, args, ctx: Context) {
    const id = getUserId(ctx);
    return ctx.prisma.tasks({ where: { author: { id }, isDeleted: false } });
  },

  task(parent, { id }, ctx: Context) {
    return ctx.prisma.task({ id });
  },

  me(parent, args, ctx: Context) {
    const id = getUserId(ctx);
    return ctx.prisma.user({ id });
  },
};
