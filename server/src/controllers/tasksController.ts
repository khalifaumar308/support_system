import TasksModel from "../models/TasksModel";
import { RequestHandler } from "express";

export const createTask: RequestHandler = async (req, res) => {
  const data = req.body;
  try {
    await TasksModel.create(data);
    return res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    return res.status(400).json({ error })
  }
};

// export const  getAllTasks: RequestHandler = async (_, res) => {
//   const tasks = (await TasksModel.find().lean().exec()).sort();
//   if (!tasks || !tasks.length) {
//     return res.status(404).json({ message: 'No task found.' });
//   }
//   const completed = tasks.filter(task => task.status === 'Completed');
//   const inProgress = tasks.filter(task => task.status === 'In Progress');
//   const pending = tasks.filter(task => task.status === 'Pending');
//   return res.status(200).json({completed, inProgress, pending});
// }

export const updateTask: RequestHandler = async (req, res) => {
  const updateData = req.body;
  const taskId = req.params[0]

  if (!taskId) {
    return res.status(400).json({ message: 'Missing parameter: id' })
  }
  const updated = TasksModel.findByIdAndUpdate(taskId, updateData);
  if (!updated) {
    return res.status(404).json({ message: "Task not found." })
  }
  return res.status(200).json({message: 'Task Updated'});
};

export const deleteTask: RequestHandler = async (req, res) => {
  const taskId = req.params.id;
  if (!taskId) {
    return res.status(400).json({ message: 'Missing parameter: id' })
  }
  const deleted = await TasksModel.findOneAndDelete({ _id: taskId }).exec()
  if (!deleted) {
    return res.status(404).json({ message: 'Task not found.' })
  }
  return res.status(200).json(deleted)
};

// export const getUserTasks: RequestHandler = async (req, res) => {
//   const userId = req.params[0];
//   if (!userId) {
//     return res.status(400).json({ message: 'Invalid User ID' })
//   }
//   const userTasks = await TasksModel.find({ 'assignedTo.id': userId }).sort("-createdAt");
//   const completed = userTasks.filter(task => task.status === 'Completed');
//   const inProgress = userTasks.filter(task => task.status === 'In Progress');
//   const pending = userTasks.filter(task => task.status === 'Pending');
//   return res.status(200).json({ completed, inProgress, pending });
// };

export const getDepartmentTasks: RequestHandler = async (req, res) => {
  const department = req.query.department;
  if  (!department) {
    return res.status(400).send('Error: Missing Department Parameter')
  } 
  const tasks = await TasksModel.find({ department: department }).sort("-createdAt").lean();
  const completed = tasks.filter(task => task.status === 'Completed');
  const inProgress = tasks.filter(task => task.status === 'In Progress');
  const pending = tasks.filter(task => task.status === 'Pending');
  return res.status(200).json({ completed, inProgress, pending });
}

export const getTasks:RequestHandler =async (req, res) => {
  const {id, department} = req.query;
  let tasks = []

  try {
    if (id) {
      tasks = await TasksModel.find({ 'assignedTo.id': id }).sort("-createdAt");
    } else if (department) {
      tasks = await TasksModel.find({ department: department }).sort("-createdAt").lean();
    } else {
      tasks = await TasksModel.find().sort("-createdAt").lean().exec()
    }
    const completed = tasks.filter(task => task.status === 'Completed');
    const inProgress = tasks.filter(task => task.status === 'In Progress');
    const pending = tasks.filter(task => task.status === 'Pending');
    return res.status(200).json({ completed, inProgress, pending });
  } catch (error) {
    return res.status(400).json({error})
  }
}