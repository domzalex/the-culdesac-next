import { NextResponse } from 'next/server'
import os from 'os'

interface CpuTimes {
    user: number;
    nice: number;
    sys: number;
    idle: number;
    irq: number;
}

export async function GET() {

    const memoryUsage = {
        totalMemory: os.totalmem(),
        usedMemory: os.totalmem() - os.freemem()
    }

    const memRatio = ((memoryUsage.usedMemory / memoryUsage.totalMemory) * 100).toFixed(0)

    const calculateCpuUsage = (): string => {
        const cpus = os.cpus()
        let totalIdle = 0
        let totalTick = 0
      
        cpus.forEach((cpu) => {
            const times: CpuTimes = cpu.times

            for (const type in times) {
                totalTick += times[type as keyof CpuTimes]
            }

            totalIdle += times.idle
        })
      
        const idlePercentage = (totalIdle / totalTick) * 100
        const usagePercentage = 100 - idlePercentage
      
        return usagePercentage.toFixed(0)
    }

    const cpuUsage = calculateCpuUsage()

    return NextResponse.json({ memRatio, cpuUsage })
}