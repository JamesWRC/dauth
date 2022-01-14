import { ethers } from "ethers";
import { Fragment, useEffect, useState } from 'react'

export default async function NetworkComp(props) {

    const [network, setNetwork] = useState(null)

    useEffect(async () => {
    var network = await new ethers.providers.Web3Provider(window.ethereum).getNetwork()
    console.log(JSON.stringify(network))

    })
    const notificationMethods = [
        { id: network, title: network }, 
        { id: 'kovan', title: 'Kovan' },
    ]
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div
                key='kovanNetworkContainerKey'
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
                <div>
                        <div className="sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                            {notificationMethods.map((notificationMethod) => (
                                <div key={notificationMethod.id} className="flex items-center">
                                    <input
                                        id={notificationMethod.id}
                                        name="notification-method"
                                        type="radio"
                                        defaultChecked={notificationMethod.id === 'kovan'}
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                    />
                                    <label htmlFor={notificationMethod.id} className="ml-3 block text-sm font-medium text-gray-700">
                                        {notificationMethod.title}
                                    </label>
                                </div>
                            ))}
                        </div>
                </div>
            </div>
        </div>
    )
}
