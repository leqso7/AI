import { useState } from 'react'
import {
  Container,
  Box,
  Typography,
  Button,
  Stack,
} from '@mui/material'

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImage(URL.createObjectURL(file))
      await analyzeImage(file)
    }
  }

  const handleCameraCapture = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.capture = 'environment'
    input.onchange = handleImageUpload
    input.click()
  }

  const analyzeImage = async (file) => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch('http://localhost:5001/api/analyze-image', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      
      if (data.success) {
        setDescription(data.description)
        alert('სურათი წარმატებით გაანალიზდა!')
      }
    } catch (error) {
      alert('შეცდომა: სურათის ანალიზი ვერ მოხერხდა')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <Typography variant="h3" color="primary" align="center">
          ფოტოს დამხმარე
        </Typography>
        
        <Box sx={{ 
          p: 3, 
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3
        }}>
          <Stack spacing={2}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => document.getElementById('imageInput').click()}
              fullWidth
            >
              ფოტოს ატვირთვა
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleCameraCapture}
              fullWidth
            >
              ფოტოს გადაღება
            </Button>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </Stack>
        </Box>

        {selectedImage && (
          <Box sx={{ 
            p: 3, 
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3
          }}>
            <Stack spacing={2}>
              <Box
                component="img"
                src={selectedImage}
                alt="ატვირთული სურათი"
                sx={{
                  maxHeight: 400,
                  width: '100%',
                  objectFit: 'contain',
                  borderRadius: 1,
                }}
              />
              {description && (
                <Typography variant="h6" align="center" color="text.primary">
                  {description}
                </Typography>
              )}
              {isLoading && (
                <Typography color="text.secondary" align="center">
                  სურათის ანალიზი მიმდინარეობს...
                </Typography>
              )}
            </Stack>
          </Box>
        )}
      </Stack>
    </Container>
  )
}

export default App
