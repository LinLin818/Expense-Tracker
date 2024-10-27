import { pgTable, serial,varchar,integer } from 'drizzle-orm/pg-core'



export const budgets = pgTable('budgets', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: integer('amount').notNull(), // Change to integer
    icon: varchar('icon'),
    createdBy: varchar('createdBy').notNull(),
});


export const incomes = pgTable('incomes', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: varchar('amount').notNull(),
    icon: varchar('icon'),
    createdBy:varchar('createdBy').notNull(),
})

export const expenses = pgTable('expenses', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: integer('amount').notNull(), // Change to integer
    icon: varchar('icon'),
    budgetId: serial("budgetId").references(() => budgets.id),
    createdAt: varchar('createdAt').notNull(),
});

