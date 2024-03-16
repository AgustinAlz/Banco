import { useState, useEffect } from "react";
import { Col, Button, Row, Space, Table } from "antd";
import { Await, useNavigate } from "react-router-dom";
import { DeleteOutlined, DollarOutlined, EditOutlined, FileAddOutlined } from '@ant-design/icons';
import { useUsers } from "../context/usersContext";
import { getUsersRequest, deleteUserRequest } from "../api/users";
import "../styles/Grid.css"

export function UserListPage() {

    const [users, setUsers] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isAccountButtonDissabled, setIsAccountButtonDisabled] = useState(true);
    const navigate = useNavigate();

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
        },
        {
            title: 'Nombre',
            dataIndex: 'givenName',
        },
        {
            title: 'Apellido',
            dataIndex: 'lastName',
        },
        {
            title: 'Correo Electrónico',
            dataIndex: 'email',
        },
        {
            title: 'Rol',
            dataIndex: ['role', 'description'],
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
        console.log(e);
        console.log(selectedRowKeys);
        if (selectedRowKeys.length != 1) {
            return "false"
        } else {
            return "true"
        }
        //if()

    }

    const getUsers = async () => {
        const res = await getUsersRequest();
        setUsers(res.data);
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
            console.log(error);
        }
    }

    const enterUserAccounts = async (id) => {
        navigate(`/owner/${id}/accounts`);
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <p>users</p>
            {loading && users.length === 0 && (
                <div>
                    <div>
                        <h1>
                            No users yet, please add a new user
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
