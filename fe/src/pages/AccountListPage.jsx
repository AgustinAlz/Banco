import { useState, useEffect } from "react";
import { Button, Space, Table, message, Typography } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined, FileAddOutlined, TransactionOutlined, RollbackOutlined } from '@ant-design/icons';
import { useUsers } from "../context/usersContext";
import { useAuth } from "../context/authContext";
import { getAccountsRequest, getAccountsByOwnerRequest, deleteAccountRequest } from "../api/accounts";
import { getUserRequest } from "../api/users";
import "../styles/Grid.css"

export function AccountListPage() {
    const { user } = useAuth();
    const { ownerId } = useParams();
    const { Title } = Typography;
    const [messageApi, contextHolder] = message.useMessage();
    const [accounts, setAccounts] = useState([]);
    const [owner, setOwner] = useState([]);
    const [filterOwners, setFilterOwners] = useState([]);
    const [filterAccountTypes, setFilterAccountTypes] = useState([]);
    const [filterAccountBalances, setFilterAccountBalances] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const formatter = new Intl.NumberFormat('es-AR', { minimumFractionDigits: 2 });

    const filterData = data => formatter => accounts.map(item => ({
        value: formatter(item),
        text: formatter(item)
    }));

    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setErrors([]);
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

    const getAccounts = async (id) => {
        let tempAccounts = "";
        if (typeof (id) === "undefined") {
            const res = await getAccountsRequest();
            setAccounts(res.data);
            tempAccounts = res.data;
        } else {
            const res = await getAccountsByOwnerRequest(id);
            setAccounts(res.data);
            tempAccounts = res.data;
        }


        let tempOwners = [];
        tempAccounts.map(tempAccount => tempAccount.owners.map(
            owner => {
                if (!tempOwners.some(tempOwner => tempOwner.text === owner.fullName)) {
                    tempOwners.push({ text: owner.fullName, value: owner.fullName });
                }
            }
        ));
        setFilterOwners(tempOwners);

        let tempAccountTypes = [];
        tempAccounts.map(tempAccount => {
            if (!tempAccountTypes.some(tempAccountType => tempAccountType.text === tempAccount.accountType.description)) {
                tempAccountTypes.push({ text: tempAccount.accountType.description, value: tempAccount.accountType.description });
            }
        }
        );
        setFilterAccountTypes(tempAccountTypes);

        let tempAccountBalances = [];
        tempAccounts.map(tempAccount => {
            if (!tempAccountBalances.some(tempAccountBalance => tempAccountBalance.text === formatter.format((Math.round(tempAccount.balance * 100) / 100)))) {
                tempAccountBalances.push({
                    text: formatter.format((Math.round(tempAccount.balance * 100) / 100)),
                    value: formatter.format((Math.round(tempAccount.balance * 100) / 100))
                });
            }
        });
        setFilterAccountBalances(tempAccountBalances);
    };

    const getOwner = async (ownerId) => {
        const res = await getUserRequest(ownerId);
        setOwner(res.data);
    };

    const createAccount = (accountId) => {
        if (typeof (ownerId) === "undefined") {
            navigate(`/accounts/create`);
        } else {
            navigate(`/owner/${ownerId}/accounts/create`);
        }
    }

    const editAccount = async (accountId) => {
        if (typeof (ownerId) === "undefined") {
            navigate(`/accounts/${accountId}`);
        } else {
            navigate(`/owner/${ownerId}/accounts/${accountId}`);
        }
    }

    const deleteAccount = async (id) => {
        try {
            await deleteAccountRequest(id);
            setAccounts(oldAccounts => {
                return oldAccounts.filter(account => account._id !== id[0])
            });
        } catch (error) {
            showError(error);
        }
    }

    const enterAccountTransactions = async (accountId) => {
        if (typeof (ownerId) === "undefined") {
            const firstOwner = accounts.filter(x => x._id == accountId)[0].owners[0];
            console.log(firstOwner)
            navigate(`/owner/${firstOwner._id}/accounts/${accountId}/transactions`);
        } else {
            navigate(`/owner/${ownerId}/accounts/${accountId}/transactions`);
        }
    }

    const showError = (error) => {
        messageApi.open({
            type: 'error',
            content: error.response.data.message,
        });
    };

    const onChange = (pagination, filters, sorter, extra) => {
        //console.log('params', pagination, filters, sorter, extra);
    };

    useEffect(() => {
        getAccounts(ownerId);
        if (ownerId) {
            getOwner(ownerId);
        }

    }, []);

    let columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            hidden: true,
            filters: filterData(accounts)(account => account._id),
            filterMode: 'menu',
            filterSearch: true,
            onFilter: (value, record) => record._id === value,
        },
        {
            title: 'Número de Cuenta',
            dataIndex: 'number',
            filters: filterData(accounts)(account => String(account.number).padStart(10, '0')),
            filterMode: 'menu',
            filterSearch: true,
            onFilter: (value, record) => record.number === Number(value),
            width: '30%',
            render: (value) => { return String(value).padStart(10, '0') },
        },
        {
            title: 'Titulares',
            dataIndex: 'owners',
            render: (owners) => owners.map(owner => `${owner.givenName} ${owner.lastName}`).join(),
            key: 'owners',
            filters: filterOwners,
            filterMode: 'menu',
            filterSearch: true,
            onFilter: (value, record) => record.owners.some(owner => owner.fullName === value),
            width: '30%',

        },
        {
            title: 'Tipo',
            dataIndex: ['accountType', 'description'],
            filters: filterAccountTypes,
            filterMode: 'menu',
            filterSearch: true,
            onFilter: (value, record) => record.accountType.description.startsWith(value),
            width: '30%',
        },
        {
            title: 'Saldo',
            dataIndex: 'balance',
            filters: filterAccountBalances,
            filterMode: 'menu',
            filterSearch: true,
            onFilter: (value, record) => formatter.format((Math.round(record.balance * 100) / 100)) === value,
            render: (value) => {
                return formatter.format((Math.round(value * 100) / 100));
            },
            align: 'right',
        },
    ].filter(
        (!user.role.adminPermission) ?
            item => !item.hidden : item => !item.all

    );

    return (
        <>
            <Title level={2}><b>Cuentas</b>: {owner.fullName}</Title>
            {contextHolder}
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
                    <Button type="primary" onClick={createAccount} icon={<FileAddOutlined />} style={!user.role.adminPermission ? { display: 'none' } : {}} >
                        Agregar
                    </Button>
                    <Button onClick={() => editAccount(selectedRowKeys)} icon={<EditOutlined />} disabled={selectedRowKeys.length != 1} loading={loading} style={!user.role.adminPermission ? { display: 'none' } : {}}>
                        Editar
                    </Button>
                    <Button onClick={() => deleteAccount(selectedRowKeys)} icon={<DeleteOutlined />} disabled={selectedRowKeys.length != 1} loading={loading} style={!user.role.adminPermission ? { display: 'none' } : {}}>
                        Eliminar
                    </Button>
                    <Button onClick={() => enterAccountTransactions(selectedRowKeys)} icon={<TransactionOutlined />} disabled={selectedRowKeys.length != 1} loading={loading}>
                        Transacciones
                    </Button>
                    <Button onClick={() => navigate("/users")} icon={<RollbackOutlined />} loading={loading} style={!user.role.adminPermission ? { display: 'none' } : {}}>
                        Volver
                    </Button>
                </Space>
                <Table rowSelection={rowSelection} columns={columns} dataSource={accounts} rowKey="_id" onChange={onChange}></Table>
            </div>
        </>
    );
}
