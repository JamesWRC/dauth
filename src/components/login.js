import { useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { Helmet } from "react-helmet"
import { ethers } from "ethers";
import { Buffer } from "buffer"
import QRCode from 'qrcode'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useCookies } from "react-cookie";
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, IdentificationIcon } from '@heroicons/react/outline';
import $ from 'jquery';
import { useNavigate } from "react-router-dom";

const { v4: uuidv4 } = require('uuid');
const METAMASK_BASE_LINK = 'https://metamask.app.link/dapp';
const WEB_SOCKET = 'socket.dauth.dev'

export default function Login() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['dauth-token']);

  const [searchParams, setSearchParams] = useSearchParams()
  var userOnMobile = searchParams.get("m") // if users i using mobile to authenticate
  var otk = searchParams.get("otk") // get the one time key
  if (!otk) {
    otk = uuidv4()
  }
  const [currOtk, setCurrOtk] = useState(otk)

  useEffect(async () => {

    const ws = new W3CWebSocket(`wss://${WEB_SOCKET}/ws/${currOtk}`);

    ws.onmessage = async function (event) {
      const json = JSON.parse(event.data);
      console.log(`Data received from server web socket: ${JSON.stringify(json)}`);

      // validate Auth
      // if (userOnMobile !== "t") {
        // const validJWT = await verifyAuth(json.payload.JWT)
        const authBadge = $("#signInResponseMessage");

        if(json.payload.logInSuccess){
          setCookie('dauthJWT', json.payload.JWT, { path: '/' });
          authBadge.addClass('text-green-500')
          authBadge.text('Successfully logged in.')
          setTimeout(function () {
            leaveLoginModal()
          }, 1000);
        }else{
          authBadge.addClass('text-red-500')
          authBadge.text('Failed to login, try again...')
          setTimeout(function () {
            leaveLoginModal()
          }, 5000);
        }
       
      // }

    };
    console.log('Init web3')


    const ethereum = window.ethereum;
    const qrCodeURL = `${METAMASK_BASE_LINK}/dauth.dev/?m=t&signin=mobile&otk=${currOtk}`
    await sendMessage(currOtk, {'mobileConnected':true}, userOnMobile)

    setTimeout(function () {
      QRCode.toCanvas(document.getElementById('authQRCodeCanvas'), qrCodeURL, { errorCorrectionLevel: 'H' }, function (err, url) {
      })
    }, 500);

    if (ethereum || (ethereum && userOnMobile === "t")) {

      try {

        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

        const account = accounts[0];
        var from = account
        var provider = new ethers.providers.Web3Provider(ethereum);

        var exampleMessage ;

        var msg ;
        var sign
        try{
          setTimeout(async function () {
            exampleMessage = `Sign message to authenticate access to: 'Example.com' with OTK: ${currOtk}`;

            msg = `0x${Buffer.from(exampleMessage, 'utf8').toString('hex')}`;
            sign = await ethereum.request({
              method: 'personal_sign',
              params: [msg, from, 'Example password'],
            });
          }, 1000);

        }catch(err){
          console.log('ERROR')
          console.log(err)

          setTimeout(function () {
            const authBadge = $("#signInResponseMessage");
            authBadge.addClass('text-red-500')
            authBadge.text("Failed to login, didn't sign message...")
            leaveLoginModal()
          }, 3000);
        }


        fetch('https://api.dauth.dev/walletAuth', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            OTK: otk,
            fromWallet: account,
            rawMessage: exampleMessage,
            signedMessage: sign,
            method: 'login'
          })
        }).then(response => response.json())
          .then(async (data) => {
            console.log(data)
            const authBadge = $("#signInResponseMessage");

          }).catch(error => {
            console.log("error")
            console.log(error)
          })

      } catch (err) {
        console.error(err);
      }

    }

  })

  function leaveLoginModal(){
    navigate(`/?`, { replace: true });
    window.location.reload()
  }

  async function sendMessage(otk, message, userOnMobile){
    if(userOnMobile !== 't'){
      return
    }
    await fetch('https://api.dauth.dev/msg', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        OTK: otk,
        message: message,
      })
    }).then(response => response.json())
      .then(async (data) => {
        console.log(data)
        if(data.numMessages > 1 && message.mobileConnected === true){
          window.close()
          window.open('', '_self', ''); 
          window.close();
        }
      }).catch(error => {
        console.log(error)
      })
  }

  return (
    <Transition.Root show={open} as={Fragment}>

      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => leaveLoginModal()}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <Helmet>
                <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js" />
                <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/eth-sig-util@3.0.1/dist/index.min.js" />
              </Helmet>
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
                  <IdentificationIcon className="h-6 w-6 text-black-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Sign in
                  </Dialog.Title>
                  <dl className="flex relative">

                  <div class="block md:hidden grid grid-cols-5 ">
                  <div></div>
                      <dd className="font-medium text-gray-900 col-span-3">
                    <dt className="text-m text-gray-500">One Time Key (OTK)&nbsp;</dt>
                    <dd className="text-m font-medium text-gray-400 text-ellipsis overflow-hidden">{currOtk}</dd>
                  </dd>
                  <div></div>

                    </div>
                    <dd className="hidden md:block font-medium text-gray-900 truncate">
                    <dt className="text-m text-gray-500">One Time Key (OTK)&nbsp;</dt>
                    <dd className="text-m font-medium text-gray-400 text-ellipsis overflow-hidden">{currOtk}</dd>
                  </dd>
                  </dl>
                  <div className="mt-2">
                    <div class="grid grid-cols-3 gap-4 ...">
                      <div></div>
                      <canvas className="place-self-center" id="authQRCodeCanvas"></canvas>
                    </div>
                    <p className="text-sm text-slate-500">
                      <a className={window.ethereum ? "hidden " : "underline underline-offset-4"} href={`${METAMASK_BASE_LINK}/dauth.dev/?m=t&signin=mobile&otk=${currOtk}`}>( On Mobile? Open in Metamask app )</a>
                    </p>
                    <p className="text-sm text-gray-500">
                      {window.ethereum ? 'Either login via opening the QR code through Metamask on your phone or via the Metamask window on your browser.' : 'Scan the QR code, open it in the Metamask app on your phone and sign the message.'}
                    </p>
                    <p id="signInResponseMessage" className="text-sm">
                      
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => leaveLoginModal()}
                >
                  Go back to home.
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
