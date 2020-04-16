import { Context } from '../utils'

export const User = {
  tasks: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).tasks()
  },
}
