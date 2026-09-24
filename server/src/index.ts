import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './lib/prisma';
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

app.post('/api/addplant', async (req, res) => {
    try {
        const { commonName, latinName, careGuide, Carelevel, Environment, Lighting } = req.body;

        if (!commonName || !Carelevel || !Environment || !Lighting) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newPlant = await prisma.plant.create({
            data: { commonName, latinName, careGuide, Carelevel, Environment, Lighting },
        });

        res.status(201).json({ message: 'Plant successfully created!', plant: newPlant });
    } catch (error) {
        console.error('Prisma Create Error:', error);
        res.status(500).json({ error: 'Failed to create plant' });
    }
});



app.get('/api/pageplants', async (req, res) => {
   try{
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const result= await getallplants(page, limit);
    res.json(result);
} catch (error) {
    res.status(500).json({ error: 'Failed to fetch plants' });
}
})



// GET /api/plants?careLevel=EASY&lightLevel=INDIRECT&query=monstera
app.get('/api/plants', async (req, res) => {
    try {
        const { query, careLevel, lightLevel, page, limit } = req.query;

        const result = await getFilteredPlants({
            query: query as string,
            careLevel: careLevel as string,
            lightLevel: lightLevel as string,
            page: page ? parseInt(page as string, 10) : 1,
            limit: limit ? parseInt(limit as string, 10) : 10,
        });

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch plants' });
    }
});


app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});