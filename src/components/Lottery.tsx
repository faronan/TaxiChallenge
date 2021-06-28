import React, { useState, useEffect } from 'react'
import {
  List,
  ListItem,
  InputGroup,
  InputRightElement,
  ListIcon,
  Button,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Box,
  Divider,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { StarIcon, SmallCloseIcon } from '@chakra-ui/icons'
import { GoogleMap, LoadScript, Circle } from '@react-google-maps/api'

export const Lottery: React.FC = () => {
  const [elements, setElements] = useState([])
  const [value, setValue] = useState(680)
  const [randomValue, setRandomValue] = useState(0)
  const [center, setCenter] = useState({})

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
  }, [])

  const handleChange = (value) => setValue(value)

  const onAddButtonClick = () => {
    setElements((elements) => [...elements, value])
  }

  const onElementCloseButtonClick = (element) => {
    setElements((elements) => elements.filter((e) => e != element))
  }

  const onLotteryButtonClick = () => {
    const randomIndex = Math.floor(Math.random() * elements.length)
    setRandomValue(elements[randomIndex])
  }

  const CalculationTaxiPrice = (price: number) => {
    return ((price - 680) / 60) * 0.279 + 1.5
  }

  const containerStyle = {
    width: '600px',
    height: '400px',
  }

  const circleOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    zIndex: 1,
  }

  return (
    <div>
      <Heading mt={3}>ぶらりタクシー途中下車</Heading>
      <InputGroup mt={3}>
        <NumberInput step={60} value={value} onChange={handleChange}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <InputRightElement width="auto">
          <Button
            disabled={value == 0}
            colorScheme="blue"
            variant="outline"
            onClick={onAddButtonClick}
          >
            追加
          </Button>
        </InputRightElement>
      </InputGroup>
      <List spacing={3} mt={3}>
        {elements.map((element, index) => (
          <ListItem key={index}>
            <ListIcon as={StarIcon} color="yellow.500" />
            {`${element}円`}
            <ListIcon
              as={SmallCloseIcon}
              color="red.500"
              onClick={() => onElementCloseButtonClick(element)}
            />
          </ListItem>
        ))}
      </List>
      <Divider mt={3} />
      <Button
        disabled={elements == []}
        colorScheme="red"
        variant="outline"
        onClick={onLotteryButtonClick}
        mt={3}
      >
        抽選
      </Button>
      {randomValue > 0 && (
        <Box borderWidth="1px" borderRadius="lg" mt={3} mb={3} p={3}>
          <Stat>
            <StatLabel>抽選結果</StatLabel>
            <StatNumber>{randomValue}円</StatNumber>
            <StatHelpText>
              ({CalculationTaxiPrice(randomValue).toFixed(1)}km)
            </StatHelpText>
          </Stat>
        </Box>
      )}
      {center && (
        <LoadScript googleMapsApiKey={process.env.GOOGLE_MAP_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
          >
            {randomValue && (
              <Circle
                center={center}
                radius={CalculationTaxiPrice(randomValue) * 1000}
                options={circleOptions}
              />
            )}
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  )
}
