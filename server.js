import express from 'express';
import cors from 'cors';
import multer from 'multer';
import vision from '@google-cloud/vision';

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// Configure multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Configure Google Cloud Vision
const visionClient = new vision.ImageAnnotatorClient({
  apiKey: 'AIzaSyCO3h0iZ3_P-2OBbaWsgApOhV1r6Z7hKF4'
});

app.post('/api/analyze-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const [result] = await visionClient.labelDetection({
      image: {
        content: req.file.buffer,
      },
    });

    const labels = result.labelAnnotations;
    const simplifiedDescription = labels
      .slice(0, 3)
      .map(label => label.description)
      .join(', ');

    res.json({
      success: true,
      description: simplifiedDescription,
      labels: labels,
    });
  } catch (error) {
    console.error('Error analyzing image:', error);
    res.status(500).json({ error: 'Error analyzing image' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
