import { Response } from 'express';
import { addProjectQuery, addUserProjectsQuery } from '../../database';
import { addProjectSchema } from '../../utils';

const addProject = async (req: any, res: Response) => {
  const { id } = req.userInformation;
  const { name, description } = req.body;
  await addProjectSchema.validateAsync(req.body);
  const { rows } = await addProjectQuery(name, description);
  addUserProjectsQuery({ userId: id, projectId: rows[0].id, role: 'owner' });
  res.status(201).json({
    data: rows[0],
    message: 'The project has been added successfully',
  });
};

export default addProject;
