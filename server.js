const express = require('express');
const multer = require('multer');
const nodeHtmlToImage = require('node-html-to-image');
const fs = require('fs');

const app = express();
const port = 3000;

// Configuration de multer pour gérer les téléchargements de fichiers
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static('public')); // Dossier public pour les fichiers HTML

// Page HTML d'upload
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Gérer le téléchargement de fichiers HTML
app.post('/upload', upload.single('htmlFile'), async (req, res) => {
  console.log('fesyugfueshfsoe');
  try {
    console.log(req);
    console.log(res);
    if (!req.file) {
      return res.status(400).send('Aucun fichier n\'a été téléchargé.');
    }

    const html = req.file.buffer.toString('utf-8');

    console.log(html);

    // Convertir le HTML en image PNG
    const image = await nodeHtmlToImage({ html });

    // Enregistrer l'image sur le serveur
    const imagePath = `public/output.png`;
    fs.writeFileSync(imagePath, image);

    res.send('Conversion réussie ! <a href="/output.png" download>Télécharger l\'image</a>');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la conversion du HTML en image.');
  }
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});