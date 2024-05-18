import { defineDb, defineTable, column } from 'astro:db';

const User = defineTable({
  columns: {
    id: column.text({
      primaryKey: true,
    }),
    name: column.text(),
    lastName: column.text(),
    matricula: column.number({
      unique: true,
    }),
    phone: column.text(),
    career: column.text(),
    email: column.text({
      unique: true,
    }),
    password: column.text(),
    role: column.text({
      default: 'user',
    }),
    username: column.text({
      unique: true,
    })
  }
})

const Complaint = defineTable({
  columns: {
    id: column.text({
      primaryKey: true,
    }),
    title: column.text(),
    description: column.text(),
    status: column.text({
      default: 'pending',
    }),
    updatedAt: column.date({
      default: new Date,
    }),
    createdAt: column.date({
      default: new Date,
    }),
    at: column.date({
      optional: true,
    }),
    location: column.text({
      optional: true,
    }),
    userId: column.text({
      references: () => User.columns.id,
    }),
  }

})

export default defineDb({
  tables: {
    User,
    Complaint,
  }
});
