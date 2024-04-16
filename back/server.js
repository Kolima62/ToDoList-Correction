import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Le serveur a bien démarré sur le port ${port}`);
});
const todoList = [
  {
    id: 1,
    content: 'Ma première tâche',
    isCompleted: true,
  },
  {
    id: 2,
    content: 'Ma deuxième tâche',
    isCompleted: false,
  },
];

app.get('/todo-list', (req, res) => {
  res.send(todoList);
});
