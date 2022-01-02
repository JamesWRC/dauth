import { useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { Helmet } from "react-helmet" 
import { ethers } from "ethers";
import { Buffer } from "buffer"
import QRCode from 'qrcode'
import { w3cwebsocket as W3CWebSocket } from "websocket";

const { v4: uuidv4 } = require('uuid');
const METAMASK_BASE_LINK = 'https://metamask.app.link/dapp/';
const WEB_SOCKET = 'prod-dauth-backend.us-east-1.elasticbeanstalk.com/ws'

// var Eth = require('ethjs')
// window.Eth = Eth
export default function Ota(){
    let { otk } = useParams();
    if(!otk){
      otk = uuidv4()
    }
    const [searchParams, setSearchParams] = useSearchParams()
    var userOnMobile = searchParams.get("mobile")

    useEffect(async () => {

      const client = new W3CWebSocket(`ws://${WEB_SOCKET}/${otk}`);

      console.log('Init web3')


      const ethereum = window.ethereum;
      const qrCodeURL = `${METAMASK_BASE_LINK}/dauth.dev/otk/${otk}?mobile=true`
      QRCode.toCanvas(document.getElementById('authQRCodeCanvas'), qrCodeURL, { errorCorrectionLevel: 'H' }, function (err, url) {
        // console.log(url)
      })
      if (ethereum && userOnMobile === "t") {

        // alert('MetaMask is installed!');
        try{
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          const account = accounts[0];
          console.log(account)
          var from = account
          var provider = new ethers.providers.Web3Provider(ethereum);
          var signer = provider.getSigner();
          // var NONCE = uuidv4()
          // var NONCE = 'dfc25738-cf54-4a48-bfbb-4c4b0d9aced7'
          const exampleMessage = 'Test `personal_sign` message, with NONCE: ' +  String(otk);

          const msg = `0x${Buffer.from(exampleMessage, 'utf8').toString('hex')}`;
          // const msg = `0231456342`;
          const sign = await ethereum.request({
            method: 'personal_sign',
            params: [msg, from, 'Example password'],
          });
          alert(sign);
          console.log(sign);

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
              signedMessage: sign
            })
          }).then(response => response.json())
          .then(data => console.log(data))
        .catch(error =>{
            console.log(error)
        })
          // personalSignVerify.disabled = false;

        } catch (err) {
          console.error(err);
          // personalSign.innerHTML = `Error: ${err.message}`;
        }

      }
    })
    return (
        <div className="App">
          <Helmet>
          <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js" />
          <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/eth-sig-util@3.0.1/dist/index.min.js" />
            </Helmet>
          <header className="App-header">
            <p>
            <canvas id="authQRCodeCanvas"></canvas>

              Your ota is {otk}
               {/* Your ota is {props} */}
            </p>

            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      );
}