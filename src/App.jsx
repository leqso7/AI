import { useState } from 'react'
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Image,
  useToast,
} from '@chakra-ui/react'
import './App.css'

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

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
        toast({
          title: 'სურათი გაანალიზებულია!',
          description: 'ჩვენ ვიპოვეთ რა არის სურათზე!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
    } catch (error) {
      toast({
        title: 'შეცდომა',
        description: 'სურათის ანალიზი ვერ მოხერხდა',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ChakraProvider>
      <Box minH="100vh" p={8} bg="gray.50">
        <VStack spacing={8}>
          <Heading size="xl" color="purple.600">
            ფოტოს დამხმარე
          </Heading>
          
          <Box
            p={6}
            bg="white"
            borderRadius="xl"
            boxShadow="lg"
            w="100%"
            maxW="600px"
          >
            <VStack spacing={4}>
              <Button
                colorScheme="purple"
                size="lg"
                onClick={() => document.getElementById('imageInput').click()}
                w="100%"
              >
                ფოტოს ატვირთვა
              </Button>
              <Button
                colorScheme="teal"
                size="lg"
                onClick={handleCameraCapture}
                w="100%"
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
            </VStack>
          </Box>

          {selectedImage && (
            <Box
              p={6}
              bg="white"
              borderRadius="xl"
              boxShadow="lg"
              w="100%"
              maxW="600px"
            >
              <VStack spacing={4}>
                <Image
                  src={selectedImage}
                  alt="ატვირთული სურათი"
                  borderRadius="lg"
                  maxH="400px"
                />
                {description && (
                  <Text fontSize="xl" textAlign="center" color="gray.700">
                    {description}
                  </Text>
                )}
                {isLoading && (
                  <Text color="gray.500">სურათის ანალიზი მიმდინარეობს...</Text>
                )}
              </VStack>
            </Box>
          )}
        </VStack>
      </Box>
    </ChakraProvider>
  )
}

export default App
