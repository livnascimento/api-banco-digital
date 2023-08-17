import express from 'express';
import router from './router.js';

const app = express();

app.use(express.json());
app.use(router);

app.listen(3000, console.log("http://localhost:3000"));