import { data } from "./prisma"

const prisma = data.PRISMA

async function createPrograms(programs: string[]) {
  for(let i = 0; i < programs.length; i++) {
    console.log('name:', programs[i])
    try {
      await prisma.program.create({
        data: {
          id: i + 1,
          name: programs[i]
        }
      })
    } catch {
      continue
    }
  }
}

async function createPerms(perms: string[]) {
  for(let i = 0; i < perms.length; i++) {
    console.log('perm_type:', perms[i])
    try {
        await prisma.permission.create({
          data: {
            id: i + 1,
            perm_type: perms[i]
          }
        })
    } catch {
      continue
    }
  }
}

async function createRoles(roles: string[]) {
  for(let i = 0; i < roles.length; i++) {
    console.log('name:', roles[i])
    try {
        await prisma.role.create({
          data: {
            id: i + 1,
            name: roles[i]
          }
        })
    } catch {
      continue
    }
  }
}

async function createRolePerms(rolePerms: number[][]) {
  
  for(let i = 0; i < rolePerms.length; i++) {
    console.log('roleId:', rolePerms[i][0],'permId:', rolePerms[i][1])
    try {
      await prisma.rolePermission.create({
        data: {
          roleId: rolePerms[i][0],
          permId: rolePerms[i][1]
        }
      })
    } catch {
      continue
    }
  }
}

async function createTraining(trainings: string[]) {
  for(let i = 0; i < trainings.length; i++) {
    console.log('type:', trainings[i])
    try {
        await prisma.training.create({
          data: {
            id: i + 1,
            type: trainings[i]
          }
        })
    } catch {
      continue
    }
  }
}

async function main() {
  const allPrograms = await prisma.program.findMany()
  const allPerms = await prisma.permission.findMany()
  const allRoles = await prisma.role.findMany()
  const allRolePerms = await prisma.rolePermission.findMany()
  const allTraining = await prisma.training.findMany()

  const PROGRAMS = ['Research', 'Curriculum Development', 'Professional Development', 'Extension']
  const PERMISSIONS = ['can_view', 'can_add', 'can_edit', 'can_delete', 'can_assign']
  const ROLES = ['User', 'Admin', 'Super User']
  const ROLE_PERMISSIONS = [[1, 2], [2, 1], [2, 2], [2, 3], [2, 4], [3, 5]]
  const TRAINING_TYPES = ['Online', 'Hybrid', 'Face-to-Face']

  console.log('Programs:', allPrograms.length, allPrograms)
  console.log('Permissions:', allPerms.length, allPerms)
  console.log('Roles:', allRoles.length, allRoles)
  console.log('Role Permissions:', allRolePerms.length, allRolePerms)
  console.log('Training Types:', allTraining.length, allTraining)

  if(allPrograms.length < PROGRAMS.length) await createPrograms(PROGRAMS)
  if(allPerms.length < PERMISSIONS.length) await createPerms(PERMISSIONS)
  if(allRoles.length < ROLES.length) await createRoles(ROLES)
  if(allRolePerms.length < ROLE_PERMISSIONS.length) await createRolePerms(ROLE_PERMISSIONS)
  if(allTraining.length < TRAINING_TYPES.length) await createTraining(TRAINING_TYPES)

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })