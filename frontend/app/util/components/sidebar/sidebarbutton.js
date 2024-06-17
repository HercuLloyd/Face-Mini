'use client'
import { useRouter } from 'next/navigation'
export default function SideBarButton({name, route}){
const router = useRouter()
    return(
        <div className="hover:bg-gray-200 p-2 w-fit h-fit rounded-md cursor-pointer" onClick={() => router.push(route)}>
            <h1 className="text-xl font-medium">{name}</h1>
        </div>
    )
}