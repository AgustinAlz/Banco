import { useState, useEffect } from "react";
import { Button, Flex, Layout, Menu, Modal, Space, Typography } from 'antd';
import { FileTextOutlined, FileAddOutlined, UserAddOutlined, StopOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { HomePage } from "./HomePage";

export function Navigation() {
    const [current, setCurrent] = useState('listNote');
    const [open, setOpen] = useState(false);
    const [isHomePage, setIsHomePage] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, logout, user } = useAuth();
    const { Title } = Typography;
    const { Header, Content, Footer, Sider } = Layout;

    useEffect(() => {
        setIsHomePage(location.pathname == "/" || location.pathname == "/login");
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
            label: "Lista de Usuarios",
            key: "/users",
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
        },
        {
            label: "Cerrar Cesion",
            key: "/logout",
            style: { float: 'right' },
            icon: <UserAddOutlined />
        }];
    const logut = () => {
        logout();
        navigate("/login");;
    }

    const onClick = (e) => {
        setCurrent(e.key);
        switch (e.key) {
            case "/users":
                navigate("/users");
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
            case "/logout":
                logout();
                navigate("/login");
                break;
        }
    };
    //style={{ background: '#FFF' }}

    const boxStyle = {
        width: '100%',

        borderRadius: 6,
        border: '1px solid #40a9ff',
    };

    return (
        <>

            {isAuthenticated && !isHomePage ? (
                <>
                    <Flex style={boxStyle} align="start">
                        <p style={{ width: '200px' }}>Banco Chelo</p>
                        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={menuOptions} />
                        <Modal
                            title="Never Gonna Give You App"
                            centered
                            open={open}
                            onOk={() => setOpen(false)}
                            onCancel={() => setOpen(false)}
                            width={610}
                        >
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=Zn_7DBUkKiYYxy80&autoplay=1" title="Never Gonna Give You App" allow="autoplay;"></iframe>
                        </Modal>
                        <Flex style={boxStyle} justify='flex-end' align='center'>
                            <p>{user.givenName + " " + user.lastName}</p>
                            <Button onClick={logout} icon={<UserAddOutlined />}>Cerrar Sesión</Button>
                        </Flex>
                    </Flex>
                </>
            ) : (
                <>
                    <Flex style={boxStyle} align="start">
                        <p style={{ width: '200px' }}>Banco Chelo</p>

                        <Flex style={boxStyle} justify='flex-end' align='center'>
                            <Button onClick={() => { navigate("/login") }}>Iniciar Sesión</Button>
                        </Flex>
                    </Flex>
                </>
            )}
        </>
    )
}

/*
return (
        <>
            <Layout style={{ background: '#FFF' }}>
                <div>
                    <h1>Banco Chelo</h1>
                </div>

                {isAuthenticated ? (
                    <>
                        <Content style={{ width: '90%' }}>
                            <Flex gap="middle" vertical={false}>

                                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={menuOptions} />
                            </Flex>
                            <Modal
                                title="Never Gonna Give You App"
                                centered
                                open={open}
                                onOk={() => setOpen(false)}
                                onCancel={() => setOpen(false)}
                                width={610}
                            >
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=Zn_7DBUkKiYYxy80&autoplay=1" title="Never Gonna Give You App" allow="autoplay;"></iframe>
                            </Modal>
                        </Content>
                        <Sider style={{ background: '#FFF' }}>
                            <Space>
                                <div>
                                    <p>{user.givenName + " " + user.lastName}</p>
                                </div>
                                <Button onClick={logout} icon={<UserAddOutlined />}>Cerrar Sesión</Button>
                            </Space>
                        </Sider>
                    </>
                ) : (
                    <p>barrita</p>
                )}

            </Layout>

        </>
    )
}
*/