import { useState, useEffect } from "react";
import { Modal, Menu } from 'antd';
import { FileTextOutlined, FileAddOutlined, UserAddOutlined, StopOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";

export function Navigation() {
    const [current, setCurrent] = useState('listNote');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location) {
            if (location.pathname.startsWith("/edit")) {
                setCurrent("/create");
            }
            else if (current !== location.pathname) {
                setCurrent(location.pathname);
            }
        }
    }, [location, current]);

    const createUser = () => {
        navigate("/user")
    }
    const menuOptions = [
        {
            label: "Lista de Nota",
            key: "/",
            icon: <FileTextOutlined />
        },
        {
            label: "Crear Nota",
            key: "/create",
            icon: <FileAddOutlined />
        },
        {
            label: "Crear Usuario",
            key: "/user",
            icon: <UserAddOutlined />
        },
        {
            label: "No tocar",
            key: "/dnt",
            icon: <StopOutlined />
        }];

    const onClick = (e) => {
        setCurrent(e.key);
        switch (e.key) {
            case "/":
                navigate("/");
                break;
            case "/create":
                navigate("/create");
                break;
            case "/user":
                navigate("/user");
                break;
                case "/dnt":
                    setOpen(true);
                    break;
        }
    };

    return (
        <div>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={menuOptions} />
            <Modal
                title="Never Gonna Give You App"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={610}
            >
                <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=Zn_7DBUkKiYYxy80&autoplay=1" title="Never Gonna Give You App"  allow="autoplay;"></iframe>
            </Modal>
        </div>
    )
}