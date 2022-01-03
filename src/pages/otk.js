import { useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { Helmet } from "react-helmet" 
import { ethers } from "ethers";
import { Buffer } from "buffer"
import QRCode from 'qrcode'
import { w3cwebsocket as W3CWebSocket } from "websocket";

const { v4: uuidv4 } = require('uuid');
const METAMASK_BASE_LINK = 'https://metamask.app.link/dapp';
const WEB_SOCKET = 'socket.dauth.dev'



export default function Otk(){

    const [searchParams, setSearchParams] = useSearchParams()
    var userOnMobile = searchParams.get("m") // if users i using mobile to authenticate
    var otk = searchParams.get("otk") // get the one time key
    if(otk == undefined){
      otk = uuidv4()
    }
    useEffect(async () => {

      const ws = new W3CWebSocket(`wss://${WEB_SOCKET}/ws/${otk}`);

      ws.onmessage = function (event) {
        const json = JSON.parse(event.data);
        console.log(`[message] Data received from server: ${json}`);
        try {
        if ((json.event = "data")) {
        
                console.log(json.data);
              }
            } catch (err) {
              // whatever you wish to do with the err
              console.log(err)
            }
        
        };
      console.log('Init web3')


      const ethereum = window.ethereum;
      const qrCodeURL = `${METAMASK_BASE_LINK}/dauth.dev/auth/?m=t&otk=${otk}`
      QRCode.toCanvas(document.getElementById('authQRCodeCanvas'), qrCodeURL, { errorCorrectionLevel: 'H' }, function (err, url) {
      })
      if (ethereum && userOnMobile === "t") {

        try{
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          const account = accounts[0];
          console.log(account)
          var from = account
          var provider = new ethers.providers.Web3Provider(ethereum);
          var signer = provider.getSigner();

          const exampleMessage = 'Test `personal_sign` message, with NONCE: ' +  String(otk);

          const msg = `0x${Buffer.from(exampleMessage, 'utf8').toString('hex')}`;

          const sign = await ethereum.request({
            method: 'personal_sign',
            params: [msg, from, 'Example password'],
          });

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

        } catch (err) {
          console.error(err);
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