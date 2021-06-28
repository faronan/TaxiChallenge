import React, { useState } from 'react'
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

export const Lottery: React.FC = () => {
  const [elements, setElements] = useState([])
  const [value, setValue] = useState(680)
  const [randomValue, setRandomValue] = useState(0)

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

  const CalculationTaxiPrice = (price:number) => {
    return ((price - 680) / 60 * 0.279 + 1.5).toFixed(1)
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
      {randomValue > 0 && <Box borderWidth="1px" borderRadius="lg" mt={3} p={3}>
        <Stat>
          <StatLabel>抽選結果</StatLabel>
          <StatNumber>{randomValue}円</StatNumber>
          <StatHelpText>({CalculationTaxiPrice(randomValue)}km)</StatHelpText>
        </Stat>
      </Box>}

    </div>
  )
}
