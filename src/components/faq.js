/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'

const faqs = [
  {
    question: "Why the name 'dauth'?",
    answer:
      "Pronounced like 'D auth' - short for Decentralized Authentication" ,
  }, 
  {
    question: "Is this safe to use?",
    answer:
      "While nothing is ever 100%, any crypto on your wallet is not touched (couldn't touch it even if I wanted to without the users concent), Dauth uses your private key to sign a message. Dauth uses you crypto wallet to digitally sign a message. You can verify your message by the OTK provided in the message." ,
    link: <a className="underline underline-offset-4" href="https://en.wikipedia.org/wiki/Digital_signature" target="_blank"> Read more about how digital signing works here</a>
  },
  {
    question: "What is an OTK?",
    answer:
      "A One Time Key or OTK acts as a NONCE, aka Number Once." ,
    link: <a className="underline underline-offset-4" href="https://en.wikipedia.org/wiki/Cryptographic_nonce" target="_blank"> Read more about how a NONCE here</a>
  },  
  {
    question: "Why use an NFT for a user account? (COMING SOON)",
    answer:
      "This whole project started out as a proof of concept to use NFTs for authentication. However learning more about NFTs, ethereum contracts and gas prices, this is the resulting learnings. Dauth uses ImmutableX to mint gasless NFTs which the user then owns. The user is then free to sell, trade or destroy the NFT." ,
    link: null
  },
  // More questions...
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function FAQ() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">Frequently asked questions</h2>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        <span className="ml-6 h-7 flex items-center">
                          <ChevronDownIcon
                            className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base text-gray-500">{faq.answer} {faq.hasOwnProperty('link') ? faq.link : null} </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
