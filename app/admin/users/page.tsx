import { getUsers } from './actions'
import { UserList } from './components/UserList'

export default async function UsersPage() {
  const users = await getUsers()

  return <UserList users={users} />
}

