import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTransactionsByAccountRequest, getTransactionRequest, createTransactionRequest, updateTransactionRequest, deleteTransactionRequest } from "../api/transactions";
import { DeleteOutlined, EditOutlined, FileAddOutlined, RollbackOutlined } from '@ant-design/icons';
import { Button, Space, Table, Flex } from "antd";

export function TransactionListPage() {
    const { ownerId, accountId } = useParams();
    const [transactions, setTransactions] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
        },
        {
            title: 'Fecha',
            dataIndex: 'date',
        },
        {
            title: 'Detalle',
            dataIndex: 'notes',
        },
        {
            title: 'Importe',
            dataIndex: 'amount',
        },/*
        {
            title: 'Saldo',
            dataIndex: 'balance',
        },*/
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

    const getTransactionsByAccount = async (id) => {
        const res = await getTransactionsByAccountRequest(id);
        setTransactions(res.data);
    };

    const createTransaction = () => {
        const currentUrl = window.location.pathname;
        navigate(`${currentUrl}/create`);
    }

    const editTransaction = async (id) => {
        const currentUrl = window.location.pathname;
        navigate(`${currentUrl}/${id}`);
    }

    const deleteTransaction = async (id) => {
        try {
            await deleteTransactionRequest(id);
            setTransactions(oldTransactions => {
                return oldTransactions.filter(transaction => transaction._id !== id[0])
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTransactionsByAccount(accountId);
    }, []);

    return (
        <>
            <h1>Transacciones</h1>
            {loading && transactions.length === 0 && (
                <div>
                    <div>
                        <h1>
                            No se han creado transacciones.
                        </h1>
                    </div>
                </div>
            )}
            <div>
                <Space direction="horizontal" style={{ display: 'flex' }} >

                    <Button type="primary" onClick={createTransaction} icon={<FileAddOutlined />}>
                        Agregar
                    </Button>
                    <Button onClick={() => editTransaction(selectedRowKeys)} icon={<EditOutlined />} disabled={selectedRowKeys.length != 1} loading={loading}>
                        Editar
                    </Button>
                    <Button onClick={() => deleteTransaction(selectedRowKeys)} icon={<DeleteOutlined />} disabled={selectedRowKeys.length != 1} loading={loading}>
                        Eliminar
                    </Button>

                    <Button onClick={() => navigate(-1)} icon={<RollbackOutlined />} loading={loading}>
                        Volver
                    </Button>
                </Space>
                <Table rowSelection={rowSelection} columns={columns} dataSource={transactions} rowKey="_id"></Table>
            </div>
        </>
    )
}