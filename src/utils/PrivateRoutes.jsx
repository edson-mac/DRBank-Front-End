import { Outlet, Navigate } from 'react-router-dom'
import { useProvider } from "../provider/provider";

const PrivateRoutes = () => {
    const { token } = useProvider();
    return(
        token ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes