import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Restrict CORS requests strictly to your configured frontend origin
app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN,
        credentials: true,
    })
);

app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Theresa Squirrel Backend Running!' });
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});