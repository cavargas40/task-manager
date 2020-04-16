import { Query } from './Query'
import { auth } from './Mutation/auth'
import { task } from './Mutation/task'
import { User } from './User'
import { Task } from './Task'

export default {
  Query,
  Mutation: {
    ...auth,
    ...task,
  },
  User,
  Task,
}
