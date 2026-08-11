import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'stream-data.json');

app.use(cors());
app.use(express.json());

// Servir la API de datos
app.get('/api/stream-data', (req, res) => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      res.setHeader('Content-Type', 'application/json');
      return res.send(data);
    }
    return res.status(404).json({ error: 'Data file not found' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post('/api/save-data', (req, res) => {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2), 'utf8');
    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get('/api/overlays', (req, res) => {
  res.json([
    { key: 'overlay_9x16_vertical_solo', name: '9:16 Vertical Solo', path: '/overlay-solo-vertical' },
    { key: 'overlay_9x16_vertical', name: '9:16 Vertical Dúo', path: '/overlay-vertical' },
    { key: 'overlay_16x9_principal', name: '16:9 Principal', path: '/overlay' },
    { key: 'transition', name: 'Transición', path: '/transition' },
    { key: 'invitacion', name: 'Invitación Digital', path: '/invitacion' }
  ]);
});

// Servir los archivos estáticos generados por el build de React
const DIST_DIR = path.join(__dirname, 'dist');
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.use((req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
