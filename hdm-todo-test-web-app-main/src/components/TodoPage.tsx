import { Check, Delete } from '@mui/icons-material';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState('');

  const handleFetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      if (Array.isArray(response)) {
        setTasks(response);
      } else {
        console.error('API response is not an array:', response);
        setTasks([]);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      setTasks([]);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      handleFetchTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleSave = async (data: Task) => {
    try {
      await api.post(`/tasks`, data);
      await handleFetchTasks();
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  const handleAddTask = async () => {
    if (newTaskName.trim() === '') return; // Do not allow empty task names
    const newTask: Partial<Task> = { name: newTaskName };
    try {
      await api.post('/tasks', newTask);
      await handleFetchTasks();
    } catch (error) {
      console.error('Failed to add task:', error);
    }
    setNewTaskName(''); // Clear the input field after adding
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleFetchTasks();
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        {tasks.map((task) => (
          <Box key={task.id} display="flex" justifyContent="center" alignItems="center" mt={2} gap={1} width="100%">
            <TextField size="small" value={task.name} fullWidth sx={{ maxWidth: 350 }} disabled />
            <Box>
              <IconButton color="success" disabled>
                <Check />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(task.id)}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))}
        <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={1}>
          <TextField
            size="small"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="New Task Name"
            fullWidth
            sx={{ maxWidth: 350 }}
          />
          <Button variant="outlined" onClick={handleAddTask}>
            Ajouter une tâche
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TodoPage;
