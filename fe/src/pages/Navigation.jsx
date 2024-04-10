import { useState, useEffect } from "react";
import { Button, Flex, Layout, Menu, Modal, Space, Typography } from 'antd';
import { UserOutlined, DollarOutlined, LogoutOutlined, StopOutlined } from '@ant-design/icons';
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
    const [, forceRender] = useState(undefined);

    const reREnder = () => {
        forceRender((prev) => !prev);
    };

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
            label: "Usuarios",
            key: "/users",
            icon: <UserOutlined />
        },
        {
            label: "Cuentas",
            key: "/accounts",
            icon: <DollarOutlined />
        },
        {
            label: "No tocar",
            key: "/dnt",
            icon: <StopOutlined />
        },];
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
            case "/accounts":
                navigate("/accounts");
                //reREnder();
                window.location.reload();
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
        height: '48px',
        //borderRadius: 6,
        //border: '1px solid rgba(5, 5, 5, 0.06)',
        //borderBottom: '1px solid #40a9ff',
        //borderBottom: '2px solid #050505',
        borderBottom: '1px solid rgba(25, 25, 25, 0.96)',

    };

    return (
        <>
            {isAuthenticated && !isHomePage ? (
                <>
                    <Flex style={boxStyle} align="start">

                        <Title style={{ marginTop: 10, width: '250px', /*border: '1px solid #40a9ff'*/ }} level={4}><b>Banco Chelo</b></Title>
                        {
                            user.role.adminPermission
                                ? <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={menuOptions} style={{ width: '700px', height: '100%', }} />
                                : <></>
                        }
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
                        <Flex style={boxStyle} justify='flex-end' align='center' >
                            <Title style={{ margin: 0, marginRight: 15 }} level={5}><b>{user.givenName + " " + user.lastName}</b></Title>

                            <Button onClick={logout} icon={<LogoutOutlined />}>Cerrar Sesión</Button>
                        </Flex>
                    </Flex>
                </>
            ) : (
                <>
                    <Flex style={boxStyle} align="start">
                        <Title style={{ marginTop: 10, width: '250px', /*border: '1px solid #40a9ff'*/ }} level={4}><b>Banco Chelo</b></Title>

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