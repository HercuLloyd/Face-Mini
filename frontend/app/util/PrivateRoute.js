import { redirect } from 'next/navigation'
import {useState, useEffect, useContext} from "react"
import { jwtDecode } from 'jwt-decode'
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants'
import api from './api'
import Sidebar from './components/sidebar/sidebar'


const PrivateRoute = ({children}) => {  
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{
            const res = await api.post("/user/token/refresh/", {
                refresh: refreshToken,
            })
            if(res.status === 200) {
                console.log("authorized")
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            }
            else{
                console.log('unauthorized')
                setIsAuthorized(false)
            }
        } catch(error) {
            console.log(error)
            setIsAuthorized(false)
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000

        if (tokenExpiration < now) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }
    }
     
    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    
    return (
    <div className='flex w-full'>
        <Sidebar/>
        {isAuthorized ? children : redirect('/sign-in')}
    </div>
        
    )
}

export default PrivateRoute
