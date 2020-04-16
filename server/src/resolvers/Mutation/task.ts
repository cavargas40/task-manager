import { getUserId, Context } from '../../utils';

export const task = {
  async createTask(
    parent,
    { description, completionDate, state },
    ctx: Context,
    info
  ) {
    const userId = getUserId(ctx);
    return ctx.prisma.createTask({
      description,
      completionDate,
      state,
      author: {
        connect: { id: userId },
      },
    });
  },

  async updateTaskState(parent, { id, state }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const taskExists = await ctx.prisma.$exists.task({
      id,
      author: { id: userId },
    });
    if (!taskExists) {
      throw new Error(`Task not found or you're not the author`);
    }

    return ctx.prisma.updateTask({ data: { state }, where: { id } });
  },

  async deleteTask(parent, { id }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const postExists = await ctx.prisma.$exists.task({
      id,
      author: { id: userId },
    });
    if (!postExists) {
      throw new Error(`Task not found or you're not the author`);
    }

    return ctx.prisma.updateTask({ data: { isDeleted: true }, where: { id } });
  },
};
