import { useNavigate } from "react-router-dom"


export function useModalNavigation(){
    const navigate = useNavigate();
    const closeModal = () => {
        navigate("/");
    }
    
    const openLogin = () => {
        navigate("/login");
    }
    
    const openSignup = () => {
        navigate("/signup");
    }

    return {closeModal, openLogin, openSignup};
}
