import { VStack, Text, Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

interface ChooseOptionProps {
    title: string; 
    description: string[];
    onButtonClick: () => void;
    buttonText: string;
}

export default function ChooseOption({ title, description, onButtonClick, buttonText }: ChooseOptionProps) {
    
    function getDescriptionTexts(): JSX.Element[] {
        return description.map((text, index) => {
            return <Text key={index} color="brand.900" fontSize="20px" mt={index === 0 ? "34px" : undefined}>{text}</Text>
        })
    }

    return (
        <VStack sx={{
            padding: '46px 122px 44px 122px',
            borderRadius: '30px',
            boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.00)'
        }} bgColor="brand.300" spacing={0}>
            <Text color="brand.900" fontSize="40px" fontFamily="VictorSerifTrial">{title}</Text>
            {getDescriptionTexts()}
            <Button mt="29px" onClick={onButtonClick}>{buttonText} <ArrowForwardIcon ml="5px" /></Button>
        </VStack>
    )
}