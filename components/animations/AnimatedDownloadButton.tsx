import React from 'react'
import Image from 'next/image'

import lottieJson from '../../assests/animated-photo.json'
import { CenteredLottie, DownloadQuoteCardCon, DownloadQuoteCardConText } from './AnimationElements';

interface AnimatedDownloadProps {
    handleDownload: () => void;
}

const AnimatedDownloadButton = ({handleDownload}: AnimatedDownloadProps) => {
  return (
    <DownloadQuoteCardCon 
        onClick={handleDownload}
    >
        <CenteredLottie
            loop
            animationData={lottieJson}
            play
        />
        <DownloadQuoteCardConText>
            Download your quote card
        </DownloadQuoteCardConText>
    </DownloadQuoteCardCon>
  )
}

export default AnimatedDownloadButton