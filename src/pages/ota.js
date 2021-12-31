import { useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { Helmet } from "react-helmet"
import { ethers } from "ethers";
import { Buffer } from "buffer"

// var Eth = require('ethjs')
// window.Eth = Eth
export default function Ota(){
    let { ota } = useParams();
    useEffect(async () => {
      // web3.personal.sign(web3.fromUtf8("Hello from Toptal!"), web3.eth.coinbase, console.log);
      console.log('Init web3')
      // const web3 = new window.Web3('https://cloudflare-eth.com')
      // const currentBlockNumber = await web3.eth.getBlockNumber()
      // alert(currentBlockNumber)
      const ethereum = window.ethereum;

      if (ethereum) {

        alert('MetaMask is installed!');
        try{
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          const account = accounts[0];
          var from = account
          var provider = new ethers.providers.Web3Provider(ethereum);
          var signer = provider.getSigner();
          // const msg = `0x${Buffer.from("exampleMessage", 'utf8').toString('hex')}`;
          const msg = `0231456342`;
          const sign = await ethereum.request({
            method: 'personal_sign',
            params: [msg, from, 'Example password'],
          });
          alert(sign);
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
              Your ota is {ota}
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