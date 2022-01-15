import logo from '../logo.svg';
import '../App.css'

function Home() {
  return (
    <div className="App">
      {/* <!DOCTYPE html> */}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" type="image/png" href="assets/img/favicon.png" />
          <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'/>
            <link rel="stylesheet" href="assets/css/styles.css" />
            <title>Document</title>
          </head>
          <body class="antialiased">

            <main>

              <div class="xl:h-screen bg-blue-50 overflow-hidden relative">
                {/* <!-- Start Hero --> */}
                <div class="sm:h-96 xl:h-full container mx-auto px-5">
                  <div class="absolute top-8">
                    <a href="#"><img src="assets/img/logo.svg" alt=""/></a>
                </div>
                    <div class="xl:h-full grid gap-y-8 sm:gap-y-0 sm:gap-x-10 sm:grid-cols-2 mt-32 xl:mt-auto content-center">
                      <div class="sm:col-span-1 space-y-5 md:space-y-8">
                        <h1 class="text-4xl sm:text-5xl xl:text-7xl font-semibold">Dauth</h1>
                        <h2 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-700"> Decentralized authentication</h2>
                        <p class="text-s md:text-2xl">Crypto wallet + simple cryptography = passwordless authentication that &nbsp;<a className="font-extrabold underline underline-offset-4"> you </a>&nbsp; control.</p>
                        <div class="flex justify-center space-x-8 py-12">
                        <button type="button" class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700  hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        &nbsp;&nbsp;&nbsp;&nbsp;Sign In&nbsp;&nbsp;&nbsp;&nbsp;
                        </button>
                        <button type="button" class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-100 bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        &nbsp;&nbsp;&nbsp;&nbsp;Sign Up&nbsp;&nbsp;&nbsp;&nbsp;
                        </button>
                          {/* <a href="#"><img class="shadow rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg" src="assets/img/apple-store-white-button.svg" alt=""/></a>
                            <a href="#"><img class="shadow rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg" src="assets/img/google-play-white-button.svg" alt=""/></a> */}
                        </div>
                    </div>
                          <div class="grid justify-items-center">
                            <img class="sm:absolute sm:-right-32 md:-right-16 lg:right-0 bottom-0 w-2/3 sm:w-2/4 lg:w-2/5" src="/assets/img/hand-illustration.png" alt=""/>
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

                      <section class="container mx-auto px-5 py-12 lg:py-28">
                        {/* <!-- Start About App --> */}
                        <div class="grid gap-4 md:gap-10 lg:grid-cols-3">
                          <div class="">
                            <h2 class="text-2xl md:text-3xl font-semibold">About Our App</h2>
                          </div>
                          <div class="lg:col-span-2">
                            <p class="text-lg md:text-2xl">
                              Nam nam est aut aut facere sapiente reprehenderit. Ipsa possimus nisi consequuntur. Amet praesentium vel ratione consequuntur quia qui sit aliquid. Amet molestiae harum praesentium omnis sit. Ad recusandae quo. Voluptate minus aut consequatur natus commodi.
                              <br/><br/>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis obcaecati minima nesciunt voluptates quia, praesentium cumque accusamus mollitia quasi! Nisi.
                    </p>
                </div>
            </div>
        </section>
                          {/* <!-- End About App --> */}

                          <div class="container mx-auto sm:px-4">
                            <hr class="bg-gray-400"/>
        </div>

                            <section class="container mx-auto px-5 py-12 lg:py-28">
                              {/* <!-- Start Features --> */}
                              <div class="grid xl:grid-cols-3 gap-10">
                                <div class="">
                                  <h2 class="text-2xl md:text-3xl font-semibold">Features</h2>
                                </div>
                                <div class="xl:col-span-2 grid gap-y-8 sm:gap-10 sm:grid-cols-2">
                                  <div class="space-y-4">
                                    <div class="flex items-center space-x-3">
                                      <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500 text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                                        </svg>
                                      </div>
                                      <h3 class="text-lg font-semibold">Free download</h3>
                                    </div>
                                    <p class="max-w-md text-base lg:text-xl text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et reiciendis dolorum facilis illum doloremque molestiae!</p>
                                  </div>
                                  <div class="space-y-5">
                                    <div class="flex items-center space-x-3">
                                      <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500 text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                      </div>
                                      <h3 class="text-lg font-semibold">Efficienct</h3>
                                    </div>
                                    <p class="max-w-md text-base lg:text-xl text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et reiciendis dolorum facilis illum doloremque molestiae!</p>
                                  </div>
                                  <div class="space-y-5">
                                    <div class="flex items-center space-x-3">
                                      <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500 text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                      </div>
                                      <h3 class="text-lg font-semibold">Security</h3>
                                    </div>
                                    <p class="max-w-md text-base lg:text-xl text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et reiciendis dolorum facilis illum doloremque molestiae!</p>
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
                                    <p class="max-w-md text-base lg:text-xl text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et reiciendis dolorum facilis illum doloremque molestiae!</p>
                                  </div>
                                </div>
                              </div>
                            </section>
                            {/* <!-- End Features --> */}

                            <section class="container mx-auto md:px-5">
                              {/* <!-- Start Download App --> */}
                              <div class="pt-12 lg:pt-24 px-5 md:px-0 text-center bg-blue-50 space-y-8 md:space-y-12">
                                <div class="space-y-4">
                                  <h2 class="text-2xl md:text-3xl font-semibold">Download now</h2>
                                  <p class="text-base">Rerum delectus cum ut illo eum id enim maiores esse. Est amet est illum perspiciatis.</p>
                                </div>
                                <div class="flex justify-center space-x-4">
                                  <a href="#"><img class="shadow rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg" src="assets/img/apple-store-black-button.svg" alt=""/></a>
                                    <a href="#"><img class="shadow rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg" src="assets/img/google-play-black-button.svg" alt=""/></a>
                </div>
                                    <div class="grid justify-items-center">
                                      <img class="w-11/12 sm:w-2/3 md:w-1/3" src="assets/img/iphone-mockup.svg" alt=""/>
                </div>
                                    </div>
        </section>
                                  {/* <!-- End Download App --> */}

                                  <footer class="container mx-auto my-8 px-5">
                                    {/* <!-- Start Footer --> */}
                                    <div class="md:flex md:justify-between md:items-center text-xs text-center text-gray-600 space-y-3 md:space-y-0">
                                      <div class="space-y-2 md:space-y-0 md:flex md:justify-between md:items-center md:space-x-5">
                                        <p>Copyright © 2021 Pippe App. All rights reserved.</p>
                                        <p>Hand illustration by <a class="text-blue-700 underline" href="https://icons8.com" rel="nofollow" target="_blank">icons8.com</a></p>
                                      </div>
                                      <div class="flex justify-center space-x-4">
                                        <a href="">
                                          <i class='text-2xl transition duration-500 ease-in-out transform hover:scale-125 bx bxl-facebook-circle' ></i>
                                        </a>
                                        <a href="">
                                          <i class='text-2xl transition duration-500 ease-in-out transform hover:scale-125 bx bxl-twitter' ></i>
                                        </a>
                                      </div>
                                    </div>
                                  </footer>
                                  {/* <!-- End Footer --> */}

    </main>
</body>
</html>
                          </div>
                          );
}

                          export default Home;