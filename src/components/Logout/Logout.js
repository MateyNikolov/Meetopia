import { useContext, useEffect } from "react"
import { AuthContext } from "../../contexts/authContext"

const Logout = () => {
    const { onLogout } = useContext(AuthContext);

    useEffect(() => {
        onLogout();
    }, [onLogout]);
};

export default Logout;