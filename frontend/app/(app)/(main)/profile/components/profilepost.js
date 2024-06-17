'use client'
import { useRouter } from 'next/navigation'

export default function ProfilePost({ username, location, text, image }) {
    const router = useRouter()
    return (
        <div className='flex flex-col gap-1 w-96 pt-4'>
            <button>
                <div className='flex gap-2 items-center bg-gray-100 p-2' onClick={() => router.push(`/event`)}>
                    <div className='h-12 w-12 bg-slate-400'></div>
                    <div className="flex flex-col text-start text-sm font-medium leading-tight">
                        <h1>{username}</h1>
                        <h1>{location}</h1>
                        <h1>September 6 12:00 PM</h1>
                    </div>
                </div>
            </button>


            <h1 className='text-sm'>
                {text}
            </h1>
            <div className={`flex flex-col h-96 w-96 bg-slate-400 rounded-md text-center justify-center ${image ? "" : "hidden"}`}>
                <h1>Image</h1>
            </div>
        </div>
    )

}