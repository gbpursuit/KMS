import { data } from "./prisma"

const prisma = data.PRISMA

async function createPrograms(programs: string[]) {
  for(let i = 0; i < programs.length; i++) {
    console.log('name:', programs[i])
    await prisma.program.create({
      data: {
        id: i + 1,
        name: programs[i]
      }
    })
  }
}

async function createPerms(perms: string[]) {
  for(let i = 0; i < perms.length; i++) {
    console.log('perm_type:', perms[i])
    await prisma.permission.create({
      data: {
        id: i + 1,
        perm_type: perms[i]
      }
    })
  }
}

async function createRoles(roles: string[]) {
  for(let i = 0; i < roles.length; i++) {
    console.log('name:', roles[i])
    await prisma.role.create({
      data: {
        id: i + 1,
        name: roles[i]
      }
    })
  }
}

async function createRolePerms(rolePerms: number[][]) {
  
  for(let i = 0; i < rolePerms.length; i++) {
    console.log('roleId:', rolePerms[i][0],'permId:', rolePerms[i][1])
    await prisma.rolePermission.create({
      data: {
        roleId: rolePerms[i][0],
        permId: rolePerms[i][1]
      }
    })
  }
}

async function createTraining(trainings: string[]) {
  for(let i = 0; i < trainings.length; i++) {
    console.log('type:', trainings[i])
    await prisma.training.create({
      data: {
        id: i + 1,
        type: trainings[i]
      }
    })
  }
}

async function main() {
  const allPrograms = await prisma.program.findMany()
  const allPerms = await prisma.permission.findMany()
  const allRoles = await prisma.role.findMany()
  const allRolePerms = await prisma.rolePermission.findMany()
  const allTraining = await prisma.training.findMany()

  console.log('Programs:', allPrograms.length, allPrograms)
  console.log('Permissions:', allPerms.length, allPerms)
  console.log('Roles:', allRoles.length, allRoles)
  console.log('Role Permissions:', allRolePerms.length, allRolePerms)
  console.log('Training Types:', allTraining.length, allTraining)

  if(allPrograms.length == 0) await createPrograms(['Research', 'Curriculum Development', 'Professional Development', 'Extensions'])
  if(allPerms.length == 0) await createPerms(['can_view', 'can_add', 'can_edit', 'can_delete', 'can_assign'])
  if(allRoles.length == 0) await createRoles(['User', 'Admin', 'Super User'])
  if(allRolePerms.length == 0) await createRolePerms([[1, 2], [2, 1], [2, 2], [2, 3], [2, 4], [3, 5]])
  if(allTraining.length == 0) await createTraining(['Online', 'Hybrid', 'Face-to-Face'])

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