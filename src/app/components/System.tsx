import { useEffect, useState } from "react"

interface SystemMetrics {
    memRatio: string,
    cpuUsage: string
}

let memArray = Array(100).fill(0)
let cpuArray = Array(100).fill(0)

const arr10 = Array(4).fill(0)

const System = () => {

    const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({ memRatio: '0.00', cpuUsage: '0.00' })

    const grabSystemMetrics = async () => {
        const response = await fetch('/api/system', {
            method: 'GET',
        })
        const data = await response.json()

        memArray.shift()
        memArray.push(data.memRatio)

        cpuArray.shift()
        cpuArray.push(data.cpuUsage)

        setSystemMetrics(data)
    }


    useEffect(() => {
        const interval = setInterval(() => {
            grabSystemMetrics()
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div id='system' className='flex flex-col bg-neutral-800 border border-neutral-700 w-1/3 sm:h-1/2 sm:w-full max-w-[600px] rounded'>
            <div className='w-full p-3 sm:p-2 border-b border-b-neutral-700'>
                <h1 className='font-bold text-xl sm:text-sm text-neutral-200'>System Status</h1>
            </div>
            <div className='w-full divide-y divide-neutral-700 max-w-[600px] flex-1'>
                <div className="w-full h-1/2 flex flex-col relative">
                    <h1 className="text-neutral-200 sm:text-xs font-bold border-b border-neutral-700 p-3 py-2 sm:px-2">Memory Usage: {systemMetrics.memRatio}%</h1>
                    <div className="w-full h-full flex relative">
                        {memArray.map((mem, index) => {
                            return (
                                <div key={index} style={{ height: `${mem}%`, width: '1%' }} className="mt-auto bg-green-700"></div>
                            )
                        })}
                        <div className="absolute bottom-0 left-0 pl-2 w-full h-full flex flex-col justify-evenly">
                            {arr10.map((num, index) => {
                                return (
                                    <div className="w-full flex items-center" key={index}>
                                        <h1 className="text-neutral-600 text-xs">
                                            {60 - (index - 1) * 20}
                                        </h1>
                                        <div className="w-full border-b border-dashed border-neutral-700"></div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="w-full h-1/2 flex flex-col">
                    <h1 className="text-neutral-200 sm:text-xs font-bold border-b border-neutral-700 p-3 py-2 sm:px-2">CPU Usage: {systemMetrics.cpuUsage}%</h1>
                    <div className="w-full h-full flex relative">
                        {cpuArray.map((cpu, index) => {
                            return (
                                <div key={index} style={{ height: `${cpu}%`, width: '1%' }} className="mt-auto bg-blue-700"></div>
                            )
                        })}
                        <div className="absolute bottom-0 left-0 pl-2 w-full h-full flex flex-col justify-evenly">
                            {arr10.map((num, index) => {
                                return (
                                    <div className="w-full flex items-center" key={index}>
                                        <h1 className="text-neutral-600 text-xs">
                                            {60 - (index - 1) * 20}
                                        </h1>
                                        <div className="w-full border-b border-dashed border-neutral-700"></div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default System