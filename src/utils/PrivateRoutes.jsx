import { Outlet, useNavigate } from 'react-router-dom'
import { useProvider } from "../provider/provider";

const PrivateRoutes = () => {
    const navigate = useNavigate();
    const { token } = useProvider();
    return(
        token ? <Outlet/> : navigate('/')
    )
}

export default PrivateRoutes