import express from 'express';

const app = express();

const PORT = 8080;

app.use(express.json());
app.use;

app.listen(PORT, () => {
  console.log(`Server levantado en http://localhost:${PORT}`);
});
