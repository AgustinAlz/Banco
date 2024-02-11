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
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

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
                    <Button onClick={() => editUser(selectedRowKeys)} icon={<EditOutlined />} disabled={selectedRowKeys.length!=1} loading={loading}>
                        Editar
                    </Button>
                    <Button onClick={() => deleteUser(selectedRowKeys)} icon={<DeleteOutlined />} disabled={selectedRowKeys.length!=1} loading={loading}>
                        Eliminar
                    </Button>
                    <Button onClick={() => editUser(selectedRowKeys)} icon={<DollarOutlined />}disabled={selectedRowKeys.length!=1} loading={loading}>
                        Cuentas
                    </Button>
                </Space>
                <Table rowSelection={rowSelection} columns={columns} dataSource={users} rowKey="_id"></Table>
            </div>
        </>
    );
}

/*
<p>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</p>
reemplazo grid por table
<div className="grid-box">
                <div className="grid-header">
                    <div className="grid-cell">
                        <Button onClick={createUser} icon={<FileAddOutlined />}>
                            Agregar
                        </Button>
                    </div>
                    <Row className="gutter-row" span={6}>
                        <Col className="gutter-row" span={1}>
                            <div className="grid-cell">Acciones</div>
                        </Col >
                        <Col className="gutter-row" span={5}>
                            <div className="grid-cell">ID</div>
                        </Col >
                        <Col className="gutter-row" span={4}>
                            <div className="grid-cell">Nombre</div>
                        </Col >
                        <Col className="gutter-row" span={4}>
                            <div className="grid-cell">Apellido</div>
                        </Col >
                        <Col className="gutter-row" span={6}>
                            <div className="grid-cell">Mail</div>
                        </Col >
                        <Col className="gutter-row" span={4}>
                            <div className="grid-cell">Rol</div>
                        </Col >
                    </Row>
                </div>
                {users.map(user => (
                    <Row className="gutter-row" key={user._id} span={6}>
                        <Col className="gutter-row" span={1}>
                            <div className="grid-cell">
                                <Button className="actions" onClick={() => editUser(user._id)} shape="circle" size="small" icon={<EditOutlined />} />
                                <Button className="actions" onClick={() => deleteUser(user._id)} shape="circle" size="small" icon={<DeleteOutlined />} />
                            </div>
                        </Col >
                        <Col className="gutter-row" span={5}>
                            <div className="grid-cell">{user._id}</div>
                        </Col >
                        <Col className="gutter-row" span={4}>
                            <div className="grid-cell">{user.givenName}</div>
                        </Col >
                        <Col className="gutter-row" span={4}>
                            <div className="grid-cell">{user.lastName}</div>
                        </Col >
                        <Col className="gutter-row" span={6}>
                            <div className="grid-cell">{user.email}</div>
                        </Col >
                        <Col className="gutter-row" span={4}>
                            <div className="grid-cell">{user.role.description}</div>
                        </Col >
                    </Row>
                ))}
            </div>*/