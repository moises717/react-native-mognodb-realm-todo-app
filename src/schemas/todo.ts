export const TodosSchema = {
  name: 'Todos',
  properties: {
    _id: 'string',
    title: 'string',
    completed: 'bool',
    create_at: 'date',
  },
  primaryKey: '_id',
};
