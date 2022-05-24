import express from 'express';
import { asyncMiddleware, checkAuth, checkMember } from '../middlewares';
import {
  addTask,
  getTasks,
  getTasksSection,
  editTask,
  deleteTask,
  dragTask,
} from '../controllers';

const tasksRoute = express.Router();
tasksRoute.use(asyncMiddleware(checkAuth));
tasksRoute.get('/tasks', asyncMiddleware(getTasks));
tasksRoute.put('/task/:id', asyncMiddleware(editTask));
tasksRoute.delete('/task/:id', asyncMiddleware(deleteTask));
tasksRoute.param('projectid', checkMember);
tasksRoute.post('/project/:projectid/task', asyncMiddleware(addTask));
tasksRoute.get('/project/:projectid/tasksection/:id/tasks', asyncMiddleware(getTasksSection));
tasksRoute.put('/task/drag', asyncMiddleware(dragTask));

export default tasksRoute;
