import { useState, useEffect } from "react";
import { Button, Space, Table, message, Flex, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, DollarOutlined, EditOutlined, FileAddOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { useUsers } from "../context/usersContext";
import { getUsersRequest, deleteUserRequest } from "../api/users";
import { useAuth } from "../context/authContext";
import "../styles/Grid.css"

export function UserListPage() {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [filterFullNames, setFilterFullNames] = useState([]);
    const [filterRoles, setFilterRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isAccountButtonDissabled, setIsAccountButtonDisabled] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const { Title } = Typography;

    const filterData = data => formatter => users.map(item => ({
        value: formatter(item),
        text: formatter(item)
    }));

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            filters: filterData(users)(user => user._id),
            filterMode: 'menu',
            filterSearch: true,
            onFilter: (value, record) => record._id === value,
        },
        {
            title: 'Nombre y Apellido',
            dataIndex: 'fullName',
            filters: filterFullNames,
            filterMode: 'menu',
            filterSearch: true,
            onFilter: (value, record) => record.fullName.startsWith(value),
        },
        {
            title: 'Correo Electrónico',
            dataIndex: 'email',
            filters: filterData(users)(user => user.email),
            filterMode: 'menu',
            filterSearch: true,
            onFilter: (value, record) => record.email.startsWith(value),
        },
        {
            title: 'Rol',
            dataIndex: ['role', 'description'],
            filters: filterRoles,
            filterMode: 'menu',
            filterSearch: true,
            onFilter: (value, record) => record.role.description.startsWith(value),
        },
    ];

    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
        const selectedUsers = users.filter((user) => newSelectedRowKeys.includes(user._id));
        const adminSelected = selectedUsers.filter((user) => user.role.adminPermission).length > 0;
        if (newSelectedRowKeys.length == 1 && !adminSelected) {
            setIsAccountButtonDisabled(false); //Button is enabled when 1 item is selected and user does not have adminPermission
        } else {
            setIsAccountButtonDisabled(true);
        }

    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const buttonDissableHandler = e => {
        if (selectedRowKeys.length != 1) {
            return "false"
        } else {
            return "true"
        }
    }

    const getUsers = async () => {
        const config = { params: { filter: 'all' } };
        const res = await getUsersRequest(config);
        setUsers(res.data);

        const tempUsers = res.data

        let tempFilterFullNames = [];
        tempUsers.map(tempUser => {
            if (!tempFilterFullNames.some(tfln => tfln.text === tempUser.fullName)) {
                tempFilterFullNames.push({ text: tempUser.fullName, value: tempUser.fullName });
            }
        });
        setFilterFullNames(tempFilterFullNames);

        let tempFilterRoles = [];
        tempUsers.map(tempUser => {
            if (!tempFilterRoles.some(tempRole => tempRole.text === tempUser.role.description)) {
                tempFilterRoles.push({ text: tempUser.role.description, value: tempUser.role.description });
            }
        }
        );
        setFilterRoles(tempFilterRoles);


    };

    const createUser = () => {
        navigate("/users/create");
    }

    const editUser = async (id) => {
        navigate("/users/" + id);
    }

    const deleteUser = async (id) => {
        try {
            await deleteUserRequest(id);
            setUsers(oldUsers => {
                return oldUsers.filter(user => user._id !== id[0])
            });
        } catch (error) {
            showError(error);
        }
    }

    const enterUserAccounts = async (id) => {
        navigate(`/owner/${id}/accounts`);
    }

    const showError = (error) => {
        messageApi.open({
            type: 'error',
            content: error.response.data.message,
        });
    };

    const searchUser = (e) => {
        console.log(e.target.value)
        let tempUserList = [];
        tempUserList = users.filter(x => x.fullName.toLowerCase().includes(e.target.value.toLowerCase()));
        //console.log(tempUserList);
        setUsers(tempUserList);
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <Title level={2}><b>Usuarios</b></Title>
            {contextHolder}
            {loading && users.length === 0 && (
                <div>
                    <div>
                        <h1>
                            No hay usuarios, por favor cree uno.
                        </h1>
                    </div>
                </div>
            )}
            <div>
                <Space direction="horizontal" style={{ display: 'flex' }} >
                    <Button type="primary" onClick={createUser} icon={<FileAddOutlined />}>
                        Agregar
                    </Button>
                    <Button onClick={() => editUser(selectedRowKeys)} icon={<EditOutlined />} disabled={selectedRowKeys.length != 1} loading={loading}>
                        Editar
                    </Button>
                    <Button onClick={() => deleteUser(selectedRowKeys)} icon={<DeleteOutlined />} disabled={selectedRowKeys.length != 1} loading={loading}>
                        Eliminar
                    </Button>

                    <Button onClick={() => enterUserAccounts(selectedRowKeys)} icon={<DollarOutlined />} disabled={isAccountButtonDissabled} loading={loading}>
                        Cuentas
                    </Button>

                </Space>
                <Table rowSelection={rowSelection} columns={columns} dataSource={users} rowKey="_id"></Table>
            </div>
        </>
    );
}

/*

     <Flex align="start" >
                    <Button style={{marginRight: '10px'}} type="primary" onClick={createUser} icon={<FileAddOutlined />}>
                        Agregar
                    </Button>
                    <Button style={{marginRight: '10px'}} onClick={() => editUser(selectedRowKeys)} icon={<EditOutlined />} disabled={selectedRowKeys.length != 1} loading={loading}>
                        Editar
                    </Button>
                    <Button style={{marginRight: '10px'}} onClick={() => deleteUser(selectedRowKeys)} icon={<DeleteOutlined />} disabled={selectedRowKeys.length != 1} loading={loading}>
                        Eliminar
                    </Button>

                    <Flex style={{ width: "100%" }} justify='flex-end' align='center'>

                        <Button onClick={() => enterUserAccounts(selectedRowKeys)} icon={<DollarOutlined />} disabled={isAccountButtonDissabled} loading={loading}>
                            Cuentas
                        </Button>
                    </Flex>
                </Flex>


                 */