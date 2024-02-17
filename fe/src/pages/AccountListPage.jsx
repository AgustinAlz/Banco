import { useState, useEffect } from "react";
import { Button, Space, Table } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined, FileAddOutlined } from '@ant-design/icons';
import { useUsers } from "../context/usersContext";
import { getAccountsByOwnerRequest, deleteAccountRequest } from "../api/accounts";
import "../styles/Grid.css"

export function AccountListPage() {
    const { ownerId } = useParams();
    const [accounts, setAccounts] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
        },
        {
            //number, owners, accountType, balance
            title: 'Número de Cuenta',
            dataIndex: 'number',
        },
        {
            title: 'Titulares',
            //dataIndex: ['owners', 'giveName'],
            dataIndex: 'owners',
            render: (owners) => owners.map(owner => `${owner.givenName} ${owner.lastName}`).join(),
            key: 'owners'
            
        },
        {
            title: 'Tipo',
            dataIndex: ['accountType', 'description'],
        },
        {
            title: 'Saldo',
            dataIndex: 'balance',
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

    const getAccountsByOwner = async (id) => {
        const res = await getAccountsByOwnerRequest(id);
        setAccounts(res.data);
    };

    const createAccount = () => {
        navigate(`/owner/${ownerId}/accounts/create`);
    }

    const editAccount = async (id) => {
        navigate(`/owner/${ownerId}/accounts/${id}`);
    }

    const deleteAccount = async (id) => {
        try {
            await deleteAccountRequest(id);
            setAccounts(oldAccounts => {
                return oldAccounts.filter(account => account._id !== id[0])
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAccountsByOwner(ownerId);
    }, []);

    return (
        <>
            <p>Cuentas</p>
            {loading && accounts.length === 0 && (
                <div>
                    <div>
                        <h1>
                            No se han creado cuentas.
                        </h1>
                    </div>
                </div>
            )}
            <div>
                <Space direction="horizontal" style={{ display: 'flex' }} >
                    <Button type="primary" onClick={createAccount} icon={<FileAddOutlined />}>
                        Agregar
                    </Button>
                    <Button onClick={() => editAccount(selectedRowKeys)} icon={<EditOutlined />} disabled={selectedRowKeys.length!=1} loading={loading}>
                        Editar
                    </Button>
                    <Button onClick={() => deleteAccount(selectedRowKeys)} icon={<DeleteOutlined />} disabled={selectedRowKeys.length!=1} loading={loading}>
                        Eliminar
                    </Button>
                </Space>
                <Table rowSelection={rowSelection} columns={columns} dataSource={accounts} rowKey="_id"></Table>
            </div>
        </>
    );
}
