import { createAction } from 'redux-actions';

export default {
  create: createAction('CREATE'),
  select: createAction('SELECT'),
  change: createAction('CHANGE')
};

