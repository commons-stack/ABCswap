import { useState } from 'react'
import SimpleConvert from '../components/swap/SimpleConvert'
import SwapHome from '../components/swap/SwapHome';

export default function Swap() {

  const [start, setStart] = useState(false);

  if(start) {
    return (
      <>
        <SimpleConvert />
      </>
    )
  } else {
    return(
      <>
        <SwapHome onNextButtonClick={setStart} />
      </>
    )
  }
}