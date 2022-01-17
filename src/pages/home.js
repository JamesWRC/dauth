import logo from '../logo.svg';
import '../App.css'
import { useEffect, useState } from 'react'
import { useCookies } from "react-cookie";
import Login from '../components/login';
import { useNavigate } from "react-router-dom";
import { useSearchParams, useParams } from "react-router-dom";


import SignupSuccess from '../components/SignupSuccess';
import AuthedContend from '../components/authedContent';
import LogoutModal from '../components/logoutModal';

function Home() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [cookies, setCookie, removeCookie] = useCookies(['dauth-token']);
  const [workerStats, setWorkerStats] = useState(null)
  const [isAuthed, setIsAuthed] = useState(null)
  var signin = searchParams.get("signin") // get the one time key

  const [showLogin, setShowLogin] = useState(signin)

  var signedUp = searchParams.get("s") // signup success

  const navigate = useNavigate();



  useEffect(async () => {
    await fetch('https://api.dauth.dev/getWorkersStats', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
      .then(async (data) => {
        console.log(data)
        setWorkerStats(data)

      }).catch(error => {
        console.log(error)
      })
  }, []);


  useEffect(async () => {
    var validJWT = await fetch('https://api.dauth.dev/verifyAuth', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        JWT: cookies.dauthJWT,
      })
    }).then(response => response.json())
      .then((data) => {
        return data.tokenValid
      }).catch(error => {

        console.log(error)
      })
    setIsAuthed(validJWT)
  }, []);
  return (
    <div className="App">
      {/* <!DOCTYPE html> */}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" type="image/png" href="assets/img/favicon.png" />
          <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet' />
          <link rel="stylesheet" href="assets/css/styles.css" />
          <title>Document</title>
        </head>
        <body class="antialiased">

          <main>

            <div class="xl:h-screen bg-blue-50 overflow-hidden relative">
              {/* <!-- Start Hero --> */}
              <div class="sm:h-96 xl:h-full container mx-auto px-5">
                <div class="absolute top-8">
                  <a href="#"><img src="assets/img/logo.svg" alt="" /></a>
                </div>
                <div class="xl:h-full grid gap-y-8 sm:gap-y-0 sm:gap-x-10 sm:grid-cols-2 mt-32 xl:mt-auto content-center">
                  <div class="sm:col-span-1 space-y-5 md:space-y-8">
                    <h1 class="text-4xl sm:text-5xl xl:text-7xl font-semibold">Dauth</h1>
                    <h2 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-700"> Decentralized authentication</h2>
                    <p class="text-s md:text-2xl">Crypto wallet + simple cryptography = passwordless authentication that <a className="font-extrabold underline underline-offset-4"> you </a> control.</p>
                    <div class="flex justify-center space-x-8 lg:py-12">
                      <button onClick={() => setShowLogin(true)} type="button" class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700  hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        &nbsp;&nbsp;Sign In&nbsp;&nbsp;
                      </button>
                      <button onClick={() => navigate(`/signup`, { replace: true })} type="button" class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-100 bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        &nbsp;&nbsp;Sign Up&nbsp;&nbsp;
                      </button>

                    </div>
                  </div>
                  <div class="grid justify-items-center inline-flex items-center">
                    <img class="sm:absolute sm:-right-4 md:-right-8 lg:right-0 xl:right-0 bottom-0 w-2/3 sm:w-2/4 lg:w-5/12 xl:w-6/12" src="/assets/img/morflax-things.png" alt="" />
                  </div>
                </div>
              </div>
              <div class="hidden sm:block sm:absolute bottom-6 sm:inset-x-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
            {/* <!-- End Hero --> */}
            {showLogin ? <Login setShowLogin={setShowLogin} /> : null}
            {signedUp ? <SignupSuccess /> : null}
            {isAuthed ? <LogoutModal /> : null}
            <section class="container mx-auto px-5 py-12 lg:py-28">
              {/* <!-- Start About App --> */}
              <div class="grid gap-4 md:gap-10 lg:grid-cols-3">
                <div class="">
                  <h2 class="text-2xl md:text-3xl font-semibold py-auto">About Dauth</h2>
                </div>
                <div class="lg:col-span-2">
                  <p class="text-lg md:text-xl">
                    This is a simple service that removes the need for annoying, outdated, often unsecure and mostly unnecessary sign up and login forms.
                    <br /><br />
                    One service quickly becking a backbone of modern security is <a href="https://haveibeenpwned.com/" className="text-sky-600">HaveIBeenPwned</a>, a service with over 11 Billion leaked passwords, email addresses and other personal data.
                    <br /><br />
                    With Dauth you can remove the need for emails & passwords for each site you use. Quickly and easily use one or multiple wallets for authentication, using your desktop or your mobile with Metamask!

                  </p>
                </div>
              </div>
            </section>
            {/* <!-- End About App --> */}

            <div class="container mx-auto sm:px-4">
              <hr class="bg-gray-400" />
            </div>

            <section class="container mx-auto px-5 py-12 lg:py-28">
              {/* <!-- Start Features --> */}
              <div class="grid xl:grid-cols-3 gap-10">
                <div class="">
                  <h2 class="text-2xl md:text-3xl font-semibold">Features</h2>
                </div>
                <div class="xl:col-span-2 grid gap-y-8 sm:gap-10 sm:grid-cols-2 ">
                  <div class="space-y-4">
                    <div class="flex items-center space-x-3">
                      <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                      </div>
                      <h3 class="text-lg font-semibold">Distributed</h3>
                    </div>
                    <p class="max-w-md text-base lg:text-xl text-gray-600">Using Cloudflares secure, eco-friendly distributed Workers platform - this service runs on 200+ edge locations, meaning Dauth is highly available, scalable and secure.</p>
                  </div>
                  <div class="space-y-5">
                    <div class="flex items-center space-x-3">
                      <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      <h3 class="text-lg font-semibold">Transferable (coming soon)</h3>
                    </div>
                    <p class="max-w-md text-base lg:text-xl text-gray-600">Dauth mints and NFT for each user account, meaning you can sell or transfer your account to anyone without providing your details. </p>
                  </div>
                  <div class="space-y-5">
                    <div class="flex items-center space-x-3">
                      <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <h3 class="text-lg font-semibold">Secure</h3>
                    </div>
                    <p class="max-w-md text-base lg:text-xl text-gray-600">Web3 technology and cryptography allows you to securely authenticate with services without providing any personal details.</p>
                  </div>
                  <div class="space-y-5">
                    <div class="flex items-center space-x-3">
                      <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 class="text-lg font-semibold">Fast</h3>
                    </div>
                    <p class="max-w-md text-base lg:text-xl text-gray-600">Dauth is blazing fast! With authentication processing times of:<p className="text-slate-900">{workerStats ? workerStats.avgRespTime !== "Error" ? workerStats.avgRespTime.toFixed(2) : workerStats.avgRespTime : null} ms</p></p>
                  </div>
                </div>
              </div>
            </section>
            {/* <!-- End Features --> */}

            {isAuthed ? <AuthedContend /> : null}
            <section class="container mx-auto md:px-5 py-24">
              {/* <!-- Start Download App --> */}
              <div class={isAuthed ? "hidden" : "pt-12 lg:pt-24 px-5 md:px-0 text-center bg-blue-50 space-y-8 md:space-y-12"}>
                <div class="space-y-4">
                  <h2 class="text-2xl md:text-3xl font-semibold">Login to learn more about Dauth</h2>
                  <p class="text-base">In order to showcase what Dauth can do, I thought it was a good idea to incentivize using it to really understand how it works.</p>

                </div>

                <div class="flex justify-center space-x-4">
                  <div class="flex justify-center space-x-8 py-12">
                    <button onClick={() => setShowLogin(true)} type="button" class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700  hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      &nbsp;&nbsp;Sign In&nbsp;&nbsp;
                    </button>
                    <button onClick={() => navigate(`/signup`, { replace: true })} type="button" class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-100 bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      &nbsp;&nbsp;Sign Up&nbsp;&nbsp;
                    </button>

                  </div>
                </div>
                {/* <div class="grid justify-items-center">
                    <img class="w-11/12 sm:w-2/3 md:w-3/3" src="assets/img/footer-phone.png" alt="" />
                </div> */}
              </div>
            </section>
            <footer class="container mx-auto my-8 px-5">
            <div class="md:flex md:justify-between md:items-center text-xs text-center text-gray-600 space-y-3 md:space-y-0">
                <div class="space-y-2 md:space-y-0 md:flex md:justify-between md:items-center md:space-x-5">
                    <p>Template and logo Glyph by <a class="text-blue-700 underline" href="https://preview.launchoice.com/pippe/" rel="nofollow" target="_blank">pippe</a> . Dauth made by JamesWRC. All rights reserved.</p>
                    <p>Glyphs by <a class="text-blue-700 underline" href="https://fontawesome.com/" rel="nofollow" target="_blank">fontawesome.com</a> and <a class="text-blue-700 underline" href="https://heroicons.com/" rel="nofollow" target="_blank">heroicons.com</a></p>
                </div>
               
            </div>
        </footer>

          </main>
        </body>
      </html>
    </div>
  );
}

export default Home;