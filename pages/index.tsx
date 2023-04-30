import Image from 'next/image'
import { Web3Button } from '@web3modal/react'

export default function Home() {
  return (
    <div className="flex items-center flex-col justify-center h-screen max-w-2xl mx-auto">
      <div className='p-2'>
        <Image src="/3.jpeg" width={600} height={100} alt="img" />
      </div>
      <div className="p-2">
        <Web3Button />
      </div>
    </div>
  )
}
