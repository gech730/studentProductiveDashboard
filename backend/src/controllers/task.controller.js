import Task from '../models/task.model.js';

const VALID_STATUSES = ['Pending', 'In Progress', 'Completed'];

function normalizeStatus(status) {
  if (!status) return 'Pending';
  const s = status.trim();
  if (s.toLowerCase() === 'pending') return 'Pending';
  if (s.toLowerCase() === 'in progress') return 'In Progress';
  if (s.toLowerCase() === 'completed') return 'Completed';
  return s;
}

function sanitize(str) {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, '').trim();
}

const createTask = async (req, res) => {
  try {
    let { title, description, status, dueDate } = req.body;
    title = sanitize(title);
    description = sanitize(description);

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (title.length > 100) {
      return res.status(400).json({ message: 'Title cannot exceed 100 characters' });
    }

    status = normalizeStatus(status);
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` });
    }

    const task = await Task.create({
      title,
      description: description || '',
      status,
      dueDate: dueDate || null,
      user: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found', tasks: [] });
    }
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const updates = {};
    const { title, description, status, dueDate } = req.body;

    if (title !== undefined) {
      updates.title = sanitize(title);
      if (!updates.title) return res.status(400).json({ message: 'Title cannot be empty' });
      if (updates.title.length > 100) return res.status(400).json({ message: 'Title too long' });
    }
    if (description !== undefined) {
      updates.description = sanitize(description);
    }
    if (status !== undefined) {
      const normalized = normalizeStatus(status);
      if (!VALID_STATUSES.includes(normalized)) {
        return res.status(400).json({ message: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` });
      }
      updates.status = normalized;
    }
    if (dueDate !== undefined) {
      updates.dueDate = dueDate || null;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No data provided for update' });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      updates,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { createTask, getTasks, updateTask, deleteTask };
