import { Role } from 'src/roles/roles.entity'
import { RoleTypes, RoleTypeToRoleId } from 'src/config'
import { User } from './../users/users.entity'

export default async () => {
  await seedDefaultRoles()
  await seedAdminUser()
}

const seedDefaultRoles = async (): Promise<void> => {
  const roles = await Role.find()
  if (!roles.length) {
    const adminRole: Role = Role.create({
      name: RoleTypes.ADMIN,
    })
    const regularUser: Role = Role.create({
      name: RoleTypes.USER,
    })
    await adminRole.save()
    await regularUser.save()
  }
}

const seedAdminUser = async (): Promise<void> => {
  const adminUser = await User.findOneBy({ roleId: RoleTypeToRoleId.ADMIN })
  const adminRole = await Role.findOneBy({ name: RoleTypes.ADMIN })
  if (!adminUser) {
    const adminUser = await User.create({
      name: process.env.ADMIN_USER_NAME,
      email: process.env.ADMIN_USER_EMAIL,
      password: process.env.ADMIN_USER_PASSWORD,
      role: adminRole,
    })
    await adminUser.save()
  }
}
