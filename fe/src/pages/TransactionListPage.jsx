import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { DeleteOutlined, EditOutlined, FileAddOutlined, RollbackOutlined } from '@ant-design/icons';
import { Button, Space, Table, Flex } from "antd";
import { Typography } from 'antd';
import moment from 'moment';
import { getTransactionsByAccountRequest, getTransactionRequest, createTransactionRequest, updateTransactionRequest, deleteTransactionRequest } from "../api/transactions";
import { getAccountRequest } from "../api/accounts";
import { useAuth } from "../context/authContext";

export function TransactionListPage() {
    const { user } = useAuth();
    const { ownerId, accountId } = useParams();
    const { Title } = Typography;
    const [transactions, setTransactions] = useState([]);
    const [account, setAccount] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterDates, setFilterDates] = useState([]);
    const [filterNotes, setFilterNotes] = useState([]);
    const [filterAmounts, setFilterAmounts] = useState([]);
    const navigate = useNavigate();
    const formatter = new Intl.NumberFormat('es-AR', { minimumFractionDigits: 2 });

    const filterData = data => formatter => transactions.map(item => ({
        value: formatter(item),
        text: formatter(item)
    }));

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            hidden: true,
            filters: filterData(transactions)(transaction => transaction._id),
            filterMode: 'menu',
            filterSearch: true,
            onFilter: (value, record) => record._id === value,
        },
        {
            title: 'Fecha',
            dataIndex: 'date',
            filters: filterDates,
            filterMode: 'menu',
            filterSearch: true,
            onFilter: (value, record) => moment(record.date).format("DD/MM/YYYY") === value,
            render: (value) => moment(value).format("DD/MM/YYYY"),
        },
        {
            title: 'Detalle',
            dataIndex: 'notes',
            filters: filterNotes,
            filterMode: 'menu',
            filterSearch: true,
            onFilter: (value, record) => record.notes === value,
        },
        {
            title: 'Importe',
            dataIndex: 'amount',
            align: 'right',
            filters: filterAmounts,
            filterMode: 'menu',
            filterSearch: true,
            onFilter: (value, record) => formatter.format((Math.round(record.amount * 100) / 100)) === value,
            render: (value) => {
                return formatter.format(value);
            },
        },/*
        {
            title: 'Saldo',
            dataIndex: 'balance',
        },*/
    ].filter(
        (!user.role.adminPermission) ?
            item => !item.hidden : item => !item.all

    );

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
        const tempTransactions = res.data;
        setTransactions(res.data);

        let tempTransacitonsDates = [];
        tempTransactions.map(tempTransaction => {
            if (!tempTransacitonsDates.some(tempTransactionDate => tempTransactionDate.text === moment(tempTransaction.date).format("DD/MM/YYYY"))) {
                tempTransacitonsDates.push({
                    text: moment(tempTransaction.date).format("DD/MM/YYYY"),
                    value: moment(tempTransaction.date).format("DD/MM/YYYY")
                });
            }
        });
        setFilterDates(tempTransacitonsDates);

        let tempTransacitonsNotes = [];
        tempTransactions.map(tempTransaction => {
            if (!tempTransacitonsNotes.some(tempTransactionNote => tempTransactionNote.text === tempTransaction.notes)) {
                tempTransacitonsNotes.push({
                    text: tempTransaction.notes,
                    value: tempTransaction.notes
                });
            }
        });
        setFilterNotes(tempTransacitonsNotes);

        let tempTransacitonsAmounts = [];
        tempTransactions.map(tempTransaction => {
            if (!tempTransacitonsAmounts.some(tempTransactionAmount => tempTransactionAmount.text === formatter.format((Math.round(tempTransaction.amount * 100) / 100)))) {
                tempTransacitonsAmounts.push({
                    text: formatter.format((Math.round(tempTransaction.amount * 100) / 100)),
                    value: formatter.format((Math.round(tempTransaction.amount * 100) / 100))
                });
            }
        });
        setFilterAmounts(tempTransacitonsAmounts);
    };

    const getAccount = async (id) => {
        const res = await getAccountRequest(id);
        setAccount(res.data);
    };

    const depositTransaction = () => {
        const currentUrl = window.location.pathname;
        navigate(`${currentUrl}/create/deposit`);
    }

    const extractionTransaction = () => {
        const currentUrl = window.location.pathname;
        navigate(`${currentUrl}/create/extraction`);
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
        getAccount(accountId);
    }, []);

    return (
        <>
            <Flex style={{ width: '100%' }} align="start">

                <Flex style={{ width: '100%' }} justify='flex-end' align='center'>
                    <Title style={{ width: '100%' }} level={2}><b>Transacciones</b>: Cuenta Nro. {String(account.number).padStart(10, '0')}</Title>
                    <Title style={{ width: '55%', textAlign: 'right', }} level={2}><b>Saldo</b>: {formatter.format(Math.round(account.balance * 100) / 100)}</Title>
                </Flex>
            </Flex>

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

                    <Button type="primary" onClick={depositTransaction} icon={<FileAddOutlined />}>
                        Depósito
                    </Button>
                    <Button type="primary" onClick={extractionTransaction} icon={<FileAddOutlined />}>
                        Extracción
                    </Button>
                    <Button onClick={() => editTransaction(selectedRowKeys)} icon={<EditOutlined />} disabled={selectedRowKeys.length != 1} loading={loading} style={!user.role.adminPermission ? { display: 'none' } : {}}>
                        Editar
                    </Button>
                    <Button onClick={() => deleteTransaction(selectedRowKeys)} icon={<DeleteOutlined />} disabled={selectedRowKeys.length != 1} loading={loading} style={!user.role.adminPermission ? { display: 'none' } : {}}>
                        Eliminar
                    </Button>

                    <Button onClick={() => navigate(`/owner/${ownerId}/accounts`)} icon={<RollbackOutlined />} loading={loading}>
                        Volver
                    </Button>
                </Space>
                <Table rowSelection={rowSelection} columns={columns} dataSource={transactions} rowKey="_id"></Table>
            </div>
        </>
    )
}