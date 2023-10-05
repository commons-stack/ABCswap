import { useState } from 'react'
import SimpleConvert from '../components/swap/SimpleConvert'
import SwapHome from '../components/swap/SwapHome';

export default function Swap() {

  const [start, setStart] = useState(false);
  const [selectedDao, setSelectedDao] = useState<string>("");

  const handleNextButtonClick = (clicked: boolean, dao: string) => {
    setStart(clicked);
    setSelectedDao(dao);
  };

  console.log(selectedDao);

  if(start) {
    return (
      <>
        <SimpleConvert dao={selectedDao}/>
      </>
    )
  } else {
    return(
      <>
        <SwapHome onNextButtonClick={handleNextButtonClick} />
      </>
    )
  }
}