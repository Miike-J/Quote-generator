import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { GradientBackgourndCon } from '@/components/QuoteGenerator/QuoteGeneratorElements';


export default function Home() {
  return (
    <>
      <Head>
        <title>Inspirational Quote Generator</title>
        <meta name="description" content="A project to generate quotes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/*Background*/}
      <GradientBackgourndCon>
        
      </GradientBackgourndCon>
    </>
  )
}