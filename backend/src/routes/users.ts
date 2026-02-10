import { Router } from 'express';
import { users, getNextId } from '../data.js';
import { type User } from '@repo/types';

const router = Router();

// GET all users
router.get('/', (req, res) => {
  res.json(users);
});

// GET user by id
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// POST create user
router.post('/', (req, res) => {
  const { fullName, roles, birthDate } = req.body;
  
  if (!fullName || !roles || !birthDate) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newUser: User = {
    id: getNextId(),
    fullName,
    roles,
    birthDate
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
router.put('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { fullName, roles, birthDate } = req.body;
  
  users[index] = {
    ...users[index],
    ...(fullName && { fullName }),
    ...(roles && { roles }),
    ...(birthDate && { birthDate })
  };

  res.json(users[index]);
});

// DELETE user
router.delete('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const deletedUser = users.splice(index, 1)[0];
  res.json(deletedUser);
});

// DELETE multiple users
router.post('/delete-multiple', (req, res) => {
  const { ids } = req.body;
  
  if (!Array.isArray(ids)) {
    return res.status(400).json({ error: 'ids must be an array' });
  }

  const deletedUsers = users.filter(u => ids.includes(u.id));
  ids.forEach(id => {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) users.splice(index, 1);
  });

  res.json({ deleted: deletedUsers.length, users: deletedUsers });
});

export default router;
