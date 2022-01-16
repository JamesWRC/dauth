import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

export default function AuthedContend(props) {

    return (
        <div>




        <section>

<div className="bg-white py-10">
  <section aria-labelledby="features-heading" class="relative">
      <div class="lg:col-start-2">
        <h2 id="features-heading" class="font-medium text-gray-500">Dauth API</h2>
        <p class="mt-4 text-4xl font-extrabold text-gray-900 tracking-tight">API Endpoints</p>
        <div class="mt-4 text-gray-500"></div>
        <button onClick={() => window.open('https://github.com/JamesWRC/dauthAPI', '_blank')} type="button" class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900">
            View on GitHub   <div className="pl-4"><FontAwesomeIcon icon={faGithub} size="2x"/></div>
            

        </button>

        {/* <button style="font-size:24px">Button <i class="fa fa-github"></i></button> */}


        <dl class="mt-10 grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2">
        <div className="">
            <dt class="font-medium text-gray-900">/walletAuth</dt>
            <dd class="mt-2 px-8 lg:px-24" >Handles the signature of the users wallet. </dd>
          </div>
          <div>
            <dt class="font-medium text-gray-900">/verifyAuth</dt>
            <dd class="mt-2 px-8 lg:px-24">Decodes and verifies the users JWT (JSON Web token). Utilizes Cloudflare's Durable object to check the wallet secret, that is unique to the wallet.</dd>
          </div>

          <div>
            <dt class="font-medium text-gray-900">/msg</dt>
            <dd class="mt-2 px-8 lg:px-24" >Used to coordinate messages to all the websockets to facilitate realtime updates during authentication. This enables users to log in via another device such as a phone.</dd>
          </div>

          <div>
            <dt class="font-medium text-gray-900">/getWorkersStats</dt>
            <dd class="mt-2 px-8 lg:px-24" >Simple endpoint to get the response time of authentication.</dd>
          </div>

        </dl>
      </div>
  </section>
</div>

<div className="bg-white py-10">
  <section aria-labelledby="features-heading" class="relative">
      <div class="lg:col-start-2">
        <h2 id="features-heading" class="font-medium text-gray-500">Deauth Example Backend</h2>
        <p class="mt-4 text-4xl font-extrabold text-gray-900 tracking-tight">Backend websockets</p>
        <div class="mt-4 text-gray-500"></div>
        <button onClick={() => window.open('https://github.com/JamesWRC/dauth-backend-example', '_blank')} type="button" class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900">
            View on GitHub   <div className="pl-4"><FontAwesomeIcon icon={faGithub} size="2x"/></div>
            

        </button>

        {/* <button style="font-size:24px">Button <i class="fa fa-github"></i></button> */}


<div class="bg-white overflow-hidden shadow rounded-lg">
  <div class="px-4 py-5 sm:px-48 ">
      Dauth utilizes the power of websockets to handle communication between the web browser and another device such as a phone. 
      Websockets helps set Dauth apart from other basic 'sign in with Metamask' login processes. This enables you to login securely anywhere without installing anything. Goodbye key loggers.
  </div>
</div>

      </div>
  </section>
</div>

            
        </section>
        </div>
    )
}
