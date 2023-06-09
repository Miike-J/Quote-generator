import React, {useEffect, useState} from 'react'

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

// Components
import { BackgroundImage1, BackgroundImage2, FooterCon, FooterLink, GenerateQuoteButton, GenerateQuoteButtonText, GradientBackgroundCon, QuoteGeneratorCon, QuoteGeneratorInnerCon, QuoteGeneratorSubTitle, QuoteGeneratorTitle } from '@/components/QuoteGenerator/QuoteGeneratorElements';

//Assests
import Cloud1 from '@/assests/Cloud1.png'
import Cloud2 from '@/assests/Cloud2.png'
import { API } from 'aws-amplify';
import { quoteQueryName } from '@/src/graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';


// interface for DynamoDB object
interface UpdateQuoteInfoData {
  id: string;
  queryName: string;
  quotesGenerated: number;
  createdAt: string;
  updatedAt: string;
}

// type guard for our fetch funciton 
function isGraphQLResultForquotesQueryName(response: any): response is GraphQLResult<{
  quotesQueryName: {
    items: [UpdateQuoteInfoData];
  };
}> {
  return response.data && response.data.quotesQueryName && response.data.quotesQueryName.items;
}


export default function Home() {
  const [numberOfQuotes, setNumberofQuotes] = useState<Number | null>(0);

  // Function to fetch our DynamoDB object (quotes generated)
  const updateQuoteInfo = async () => {
    try {
      const response = await API.graphql<UpdateQuoteInfoData>({
        query: quoteQueryName,
        authMode: 'AWS_IAM',
        variables: {
          queryName: "LIVE",
        },
      })
      // console.log('response', response)

      //Create type guards
      if (!isGraphQLResultForquotesQueryName(response)) {
        throw new Error('Unexpected response from API.graphql')
      }

      if (!response.data) {
        throw new Error('Response data is undefined')
      }

      const recievedNumberOfQuotes = response.data.quotesQueryName.items[0].quotesGenerated;
      setNumberofQuotes(recievedNumberOfQuotes);


    } catch (error) {
      console.log('error getting quote data', error)
    }
  }

  useEffect(() => {
    updateQuoteInfo();
  }, [])

  return (
    <>
      <Head>
        <title>Inspirational Quote Generator</title>
        <meta name="description" content="A project to generate quotes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/*Background*/}
      <GradientBackgroundCon>

        {/* Quote Generator Modal Pop-up */}
        {/* <QuoteGeneratorModal
        /> */}

        {/* Quote Generator */}
        <QuoteGeneratorCon>
          <QuoteGeneratorInnerCon>
            <QuoteGeneratorTitle>
              Daily Inspiration Generator
            </QuoteGeneratorTitle>

            <QuoteGeneratorSubTitle>
              Looking for a splash of inspiration? Generate a quote card with a random inspirational quote provided by <FooterLink href="https://zenquotes.io" target="blank" rel="noopener noreferrer">ZenQuotes API</FooterLink>
            </QuoteGeneratorSubTitle>

            <GenerateQuoteButton>
              <GenerateQuoteButtonText 
              // onClick={null}
              >
                Make a Quote
              </GenerateQuoteButtonText>
            </GenerateQuoteButton>

          </QuoteGeneratorInnerCon>
        </QuoteGeneratorCon>





      {/*Background images */}  
      <BackgroundImage1
        src={Cloud1}
        height="300"
        alt="cloudybackground1"
        />

      <BackgroundImage2
        src={Cloud2}
        height="300"
        alt="cloudybackground2"
        />


        {/* Footer */}
        <FooterCon>
          <>
            Quotes Generated: {numberOfQuotes}
            <br />
            Developed by <FooterLink href="https://github.com/Miike-J" target="_blank" rel="noopener noreferrer"> Miike-J
            </FooterLink>
          </>
        </FooterCon>

      </GradientBackgroundCon>
    </>
  )
}
