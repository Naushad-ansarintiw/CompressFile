import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { encodeData } from './compression/encode_decode.js';
import { join } from 'path';

const app = express();
const port = 3000;
const __dirname = import.meta.dirname;

// Set up middleware for handling file uploads
const upload = multer({ dest: 'uploads/' });

app.use(express.json());

// Serve static files from the public folder
app.use(express.static(join(__dirname, 'public')));

// Define a route to serve the HTML form for file upload
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.post('/uploads')

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});