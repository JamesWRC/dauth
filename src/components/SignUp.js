
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { MenuIcon, SearchIcon, ShoppingCartIcon, UserIcon, XIcon } from '@heroicons/react/outline'
import $ from 'jquery';
import { useSearchParams, useParams } from "react-router-dom";
import QRCode from 'qrcode'

import { CheckCircleIcon, QrcodeIcon } from '@heroicons/react/solid'
import metamaskLogo from '../metamask.svg'
const { v4: uuidv4 } = require('uuid');

const ModelViewer = require('@metamask/logo');
const METAMASK_BASE_LINK = 'https://metamask.app.link/dapp';


const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP']
const navigation = {
  categories: [
    {
      name: 'Women',
      featured: [
        { name: 'Sleep', href: '#' },
        { name: 'Swimwear', href: '#' },
        { name: 'Underwear', href: '#' },
      ],
      collection: [
        { name: 'Everything', href: '#' },
        { name: 'Core', href: '#' },
        { name: 'New Arrivals', href: '#' },
        { name: 'Sale', href: '#' },
      ],
      categories: [
        { name: 'Basic Tees', href: '#' },
        { name: 'Artwork Tees', href: '#' },
        { name: 'Bottoms', href: '#' },
        { name: 'Underwear', href: '#' },
        { name: 'Accessories', href: '#' },
      ],
      brands: [
        { name: 'Full Nelson', href: '#' },
        { name: 'My Way', href: '#' },
        { name: 'Re-Arranged', href: '#' },
        { name: 'Counterfeit', href: '#' },
        { name: 'Significant Other', href: '#' },
      ],
    },
    {
      name: 'Men',
      featured: [
        { name: 'Casual', href: '#' },
        { name: 'Boxers', href: '#' },
        { name: 'Outdoor', href: '#' },
      ],
      collection: [
        { name: 'Everything', href: '#' },
        { name: 'Core', href: '#' },
        { name: 'New Arrivals', href: '#' },
        { name: 'Sale', href: '#' },
      ],
      categories: [
        { name: 'Artwork Tees', href: '#' },
        { name: 'Pants', href: '#' },
        { name: 'Accessories', href: '#' },
        { name: 'Boxers', href: '#' },
        { name: 'Basic Tees', href: '#' },
      ],
      brands: [
        { name: 'Significant Other', href: '#' },
        { name: 'My Way', href: '#' },
        { name: 'Counterfeit', href: '#' },
        { name: 'Re-Arranged', href: '#' },
        { name: 'Full Nelson', href: '#' },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
}
const products = [
  {
    id: 1,
    name: 'Distant Mountains Artwork Tee',
    price: '$36.00',
    description: 'You awake in a new, mysterious land. Mist hangs low along the distant mountains. What does it mean?',
    address: ['Floyd Miles', '7363 Cynthia Pass', 'Toronto, ON N3Y 4H8'],
    email: 'f•••@example.com',
    phone: '1•••••••••40',
    href: '#',
    status: 'Processing',
    step: 3,
    date: 'March 24, 2021',
    datetime: '2021-03-24',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/confirmation-page-04-product-01.jpg',
    imageAlt: 'Off-white t-shirt with circular dot illustration on the front of mountain ridges that fade.',
  },
  // More products...
]
const footerNavigation = {
  account: [
    { name: 'Manage Account', href: '#' },
    { name: 'Saved Items', href: '#' },
    { name: 'Orders', href: '#' },
    { name: 'Redeem Gift card', href: '#' },
  ],
  service: [
    { name: 'Shipping & Returns', href: '#' },
    { name: 'Warranty', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Find a store', href: '#' },
    { name: 'Get in touch', href: '#' },
  ],
  company: [
    { name: 'Who we are', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy', href: '#' },
  ],
  connect: [
    { name: 'Instagram', href: '#' },
    { name: 'Pinterest', href: '#' },
    { name: 'Twitter', href: '#' },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}





export default function SignUp() {
  const [open, setOpen] = useState(false)
  const [wallet, setWallet] = useState("Couldn't connect to MetaMask...")
  const [showQRCode, setShowQRCode] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()
  var userOnMobile = searchParams.get("m") // if users i using mobile to authenticate
  var otk = searchParams.get("otk") // get the one time key
  if (otk == undefined) {
    otk = uuidv4()
  }

  useEffect(async () => {
    
    var ethereum = window.ethereum


    if(ethereum){
      showMask()
      if(ethereum.isConnected()){
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        var walletUsed = accounts[0];
        setWallet(walletUsed)
      }else{
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        var walletUsed = accounts[0];
        setWallet(walletUsed)
      }
      ethereum.on('accountsChanged', (accounts) => {
        setWallet(accounts[0])
      });   
    }
      
      showMobileQRCode()
    

    function showMobileQRCode(){
      const qrCodeURL = `${METAMASK_BASE_LINK}/dauth.dev/auth/?m=t&otk=${otk}`
      const qrCodeParent = $("#metamask-logo-parent");
        QRCode.toCanvas(document.getElementById('authQRCodeCanvas'), qrCodeURL, { 
          errorCorrectionLevel: 'H',
          width:qrCodeParent.width(),
          height:qrCodeParent.height(),
          margin: 9
        }, function (err, url) {
      })
    }

    async function showMask() {

      var container = document.getElementById('metamask-logo-parent');
      var width = container.clientWidth
      var height = container.clientHeight
      // To render with fixed dimensions:
      var viewer = ModelViewer({

        // Dictates whether width & height are px or multiplied
        pxNotRatio: true,
        width: width,
        height: height,
        // pxNotRatio: false,

        // To make the face follow the mouse.
        followMouse: true,

        // head should slowly drift (overrides lookAt)
        slowDrift: false,
      });

      // add viewer to DOM

      container.appendChild(viewer.container);
      var child = $("div").find("svg")
      var child = $("div").find("svg")

      var qrCodeCanvas = $("#authQRCodeCanvas")
      if(showQRCode ){
        qrCodeCanvas.addClass('z-10')
      }else if(qrCodeCanvas.hasClass('z-10')){
        qrCodeCanvas.removeClass('z-0')
      }
      if (child.width() >= 450) {
        child.addClass('pt-9')
        child.addClass('overflow-visible')
      } else {
        if (child.hasClass('pt-9')) {
          child.removeClass('pt-9')
        }
        if (child.hasClass('overflow-visible')) {
          child.removeClass('overflow-visible')
        }
      }
      viewer.lookAt({
        x: 100,
        y: 100,
      });

      // enable mouse follow
      viewer.setFollowMouse(true);

      function reportWindowSize() {


        var child = $("div").find("svg")
        if (child.width() >= 450) {
          child.addClass('pt-9')
          child.addClass('overflow-visible')
        } else {
          if (child.hasClass('pt-9')) {
            child.removeClass('pt-9')
          }
          if (child.hasClass('overflow-visible')) {
            child.removeClass('overflow-visible')
          }
        }
      
      setShowQRCode(false)
      }
      window.addEventListener('resize', reportWindowSize);


    }
  },[showQRCode])



  return (
    <div className="bg-white">
      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Sign Up</h1>

        <div className="text-sm border-b border-gray-200 mt-2 pb-5 sm:flex sm:justify-between">
          <dl className="flex">
            <dd className="font-medium text-gray-900 truncate">
              <dt className="text-gray-500">Wallet Address&nbsp;</dt>
              <dd className="font-medium text-gray-900 text-ellipsis overflow-hidden">{wallet}</dd>
            </dd>
            {/* </dl> */}
            {/* <dl className="flex"> */}

            <dd className="font-medium text-gray-900">
              <dt>
                <span className="sr-only">String</span>
                <span className="text-gray-400 mx-2" aria-hidden="true">
                  {/* &middot; */}
                </span>
              </dt>
            </dd>

          </dl>
          <dl className="flex relative">

            <dd className="font-medium text-gray-900 truncate">
              <dt className="text-gray-500">One Time Key (OTK)&nbsp;</dt>
              <dd className="font-medium text-gray-900 text-ellipsis overflow-hidden">{otk}</dd>
            </dd>
          </dl>
          {/* <div className="mt-4 sm:mt-0 left">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Change Wallet<span aria-hidden="true"> &rarr;</span>
            </a>
          </div> */}
        </div>
        <section aria-labelledby="products-heading" className="mt-8">
          <h2 id="products-heading" className="sr-only">
            Products purchased
          </h2>

          <div className="space-y-24">
            {products.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-1 text-sm sm:grid-rows-1 sm:grid-cols-12 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
              >
                
                <div className="sm:col-span-4 md:col-span-5 md:row-end-2 md:row-span-2 relative">
                <div className="ml-4 flex-shrink-0 flow-root flex justify-end absolute z-40 right-0 p-3">
                            <button
                              type="button"
                              className="-m-2.5 p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                              onClick={()=>{setShowQRCode(!showQRCode)}}
                            >
                              <span className="sr-only">Remove</span>
                              {!showQRCode ?
                               <QrcodeIcon className={window.ethereum ? "h-6 w-6 z-20" : "hidden"} aria-hidden="true" />
                               :
                               <img width="25px" height="25px" src={metamaskLogo} className={window.ethereum ? "MetaMask-logo z-20" : "hidden"} alt="logo" />
                              }
                            </button>
                          </div>
                  <div className="aspect-w-1 aspect-h-1 bg-gray-50 rounded-lg overflow-hidden border border-transparent shadow-xl" id="metamask-logo-parent">
                    <div alt="metamask-logo" className={"object-center object-cover w-fit h-fit -mt-4"}  id="metamask-logo" />
                    
                    <canvas id="authQRCodeCanvas" className={!window.ethereum || (showQRCode) ? "block w-fit h-fit" : "hidden"}></canvas>

                  </div>
                </div>
                <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    <a href={product.href}>{product.name}</a>
                  </h3>
                  <p className="font-medium text-gray-900 mt-1">{product.price}</p>
                  <p className="text-gray-500 mt-3">{product.description}</p>
                </div>
                <div className="sm:col-span-12 md:col-span-7">
                  <dl className="grid grid-cols-1 gap-y-8 border-b py-8 border-gray-200 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                    <div>
                      <dt className="font-medium text-gray-900">Delivery address</dt>
                      <dd className="mt-3 text-gray-500">
                        <span className="block">{product.address[0]}</span>
                        <span className="block">{product.address[1]}</span>
                        <span className="block">{product.address[2]}</span>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-900">Shipping updates</dt>
                      <dd className="mt-3 text-gray-500 space-y-3">
                        <p>{product.email}</p>
                        <p>{product.phone}</p>
                        <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                          Edit
                        </button>
                      </dd>
                    </div>
                  </dl>
                  <p className="font-medium text-gray-900 mt-6 md:mt-10">
                    {product.status} on <time dateTime={product.datetime}>{product.date}</time>
                  </p>
                  <div className="mt-6">
                    <div className="bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-indigo-600 rounded-full"
                        style={{ width: `calc((${product.step} * 2 + 1) / 8 * 100%)` }}
                      />
                    </div>
                    <div className="hidden sm:grid grid-cols-4 font-medium text-gray-600 mt-6">
                      <div className="text-indigo-600">Order placed</div>
                      <div className={classNames(product.step > 0 ? 'text-indigo-600' : '', 'text-center')}>
                        Processing
                      </div>
                      <div className={classNames(product.step > 1 ? 'text-indigo-600' : '', 'text-center')}>
                        Shipped
                      </div>
                      <div className={classNames(product.step > 2 ? 'text-indigo-600' : '', 'text-right')}>
                        Delivered
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Billing */}
        <section aria-labelledby="summary-heading" className="mt-24">
          <h2 id="summary-heading" className="sr-only">
            Billing Summary
          </h2>

          <div className="bg-gray-50 rounded-lg py-6 px-6 lg:px-0 lg:py-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
            <dl className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:pl-8 lg:col-span-5">
              <div>
                <dt className="font-medium text-gray-900">Billing address</dt>
                <dd className="mt-3 text-gray-500">
                  <span className="block">Floyd Miles</span>
                  <span className="block">7363 Cynthia Pass</span>
                  <span className="block">Toronto, ON N3Y 4H8</span>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Payment information</dt>
                <dd className="mt-3 flex">
                  <div>
                    <svg
                      aria-hidden="true"
                      width={36}
                      height={24}
                      viewBox="0 0 36 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-auto"
                    >
                      <rect width={36} height={24} rx={4} fill="#224DBA" />
                      <path
                        d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                        fill="#fff"
                      />
                    </svg>
                    <p className="sr-only">Visa</p>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-900">Ending with 4242</p>
                    <p className="text-gray-600">Expires 02 / 24</p>
                  </div>
                </dd>
              </div>
            </dl>

            <dl className="mt-8 divide-y divide-gray-200 text-sm lg:mt-0 lg:pr-8 lg:col-span-7">
              <div className="pb-4 flex items-center justify-between">
                <dt className="text-gray-600">Subtotal</dt>
                <dd className="font-medium text-gray-900">$72</dd>
              </div>
              <div className="py-4 flex items-center justify-between">
                <dt className="text-gray-600">Shipping</dt>
                <dd className="font-medium text-gray-900">$5</dd>
              </div>
              <div className="py-4 flex items-center justify-between">
                <dt className="text-gray-600">Tax</dt>
                <dd className="font-medium text-gray-900">$6.16</dd>
              </div>
              <div className="pt-4 flex items-center justify-between">
                <dt className="font-medium text-gray-900">Order total</dt>
                <dd className="font-medium text-indigo-600">$83.16</dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <footer aria-labelledby="footer-heading" className="bg-white border-t border-gray-200">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 grid grid-cols-2 gap-8 sm:gap-y-0 sm:grid-cols-2 lg:grid-cols-4">
            <div className="grid grid-cols-1 gap-y-10 lg:col-span-2 lg:grid-cols-2 lg:gap-y-0 lg:gap-x-8">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Account</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.account.map((item) => (
                    <li key={item.name} className="text-sm">
                      <a href={item.href} className="text-gray-500 hover:text-gray-600">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Service</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.service.map((item) => (
                    <li key={item.name} className="text-sm">
                      <a href={item.href} className="text-gray-500 hover:text-gray-600">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-10 lg:col-span-2 lg:grid-cols-2 lg:gap-y-0 lg:gap-x-8">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Company</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.company.map((item) => (
                    <li key={item.name} className="text-sm">
                      <a href={item.href} className="text-gray-500 hover:text-gray-600">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Connect</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.connect.map((item) => (
                    <li key={item.name} className="text-sm">
                      <a href={item.href} className="text-gray-500 hover:text-gray-600">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 py-10 sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center justify-center text-sm text-gray-500">
              <p>Shipping to Canada ($CAD)</p>
              <p className="ml-3 border-l border-gray-200 pl-3">English</p>
            </div>
            <p className="mt-6 text-sm text-gray-500 text-center sm:mt-0">&copy; 2021 Clothing Company, Ltd.</p>
          </div>
        </div>
      </footer>
    </div>
  )

  
}
