import { useNavigate } from "react-router-dom";
import {Button} from 'antd';


export function HomePage() {
    const navigate = useNavigate();


    return (
        <>
            <Button onClick={() => { navigate("/login") }}>
                Iniciar Sesión
            </Button>
        </>

    )

}