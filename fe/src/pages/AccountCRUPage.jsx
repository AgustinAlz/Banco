import React from 'react';
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, message, Button, Select, Form, Input, InputNumber } from 'antd';
import { getAccountTypesRequest } from "../api/accountTypes";
import { getAccountsRequest, getAccountRequest, createAccountRequest, updateAccountRequest, getNextAccountRequest } from "../api/accounts";
import { getUsersRequest, getUserRequest } from '../api/users';
import { useAuth } from "../context/authContext";
import { accountSchema } from "../schemas/account";
import { zodResolver } from "@hookform/resolvers/zod";

//https://codesandbox.io/p/sandbox/antd-reproduction-template-forked-8gkete?file=%2Findex.js%3A77%2C54-77%2C70

export function AccountCRUPage() {
    const { user } = useAuth();
    const { id } = useParams();
    const { ownerId } = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const formatter = new Intl.NumberFormat('es-AR', { minimumFractionDigits: 2 });
    const [accountTypes, setAccountTypes] = useState([]);
    const [owners, setOwners] = useState([]);
    const [userOwner, setUserOwner] = useState([]);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [account, setAccount] = useState({
        _id: "",
        number: "",
        owners: [],
        accountType: "",
        balance: "0,00",
        editing: false
    });
    //const [account, setAccount] = useState();

    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setErrors([]);
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    const getAccountTypes = async () => {
        const responseAccountTypes = await getAccountTypesRequest();
        setAccountTypes(responseAccountTypes.data);
    };

    const getOwners = async () => {
        /*const config = { params: { filter: 'regularUsersOnly' } };
        const responseOwners = await getUsersRequest(config);
        setOwners(responseOwners.data);*/

        const responseOwners = await getUsersRequest({ params: { filter: 'regularUsersOnly' } })
        setOwners(responseOwners.data);
        setAccount({ ...account, owners: responseOwners.data.filter(x => x._id === ownerId) });
    };

    const getAccount = async (accountId) => {
        //const responseAccountOwner = await getUserRequest(ownerId);
        const responseNextAccount = await getNextAccountRequest();
        if (accountId) {
            const res = await getAccountRequest(accountId);
            setAccount({
                _id: accountId,
                number: String(res.data.number).padStart(10, '0'),
                owners: res.data.owners,
                accountType: res.data.accountType,
                balance: formatter.format((Math.round(res.data.balance * 100) / 100)),
                editing: true
            });
        } else {
            setAccount({
                _id: "",
                number: String(responseNextAccount.data).padStart(10, '0'),
                owners: [/*responseAccountOwner.data*/],
                accountType: "",
                balance: "0,00",
                editing: false
            });
        }
    };

    useEffect(() => {
        async function fetchData() {
            const accountId = id;

            getAccountTypes();
            getOwners();
            getAccount(accountId);


            /*const responseAccountTypes = await getAccountTypesRequest();
            setAccountTypes(responseAccountTypes.data);
            const config = { params: { filter: 'regularUsersOnly' } };
            const responseOwners = await getUsersRequest(config);
            setOwners(responseOwners.data);

            //const responseAccountOwner = await getUserRequest(ownerId);
            //setUserOwner(responseAccountOwner.data);
            //console.log("filto", responseOwners.data.filter(x => x._id === ownerId));
            //setAccount({ ...account, owners: responseOwners.data.filter(x => x._id === ownerId) });

            /*setAccount({
                _id: "",
                number: "",
                owners: [responseAccountOwner.data],
                accountType: "",
                balance: "0,00",
                editing: false
            });*/


            /*if (accountId) {
                const res = await getAccountRequest(accountId);
                setAccount({
                    _id: accountId,
                    number: String(res.data.number).padStart(10, '0'),
                    owners: res.data.owners,
                    accountType: res.data.accountType,
                    balance: formatter.format((Math.round(res.data.balance * 100) / 100)),
                    editing: true
                });
            }*/
        }
        fetchData();
        form.resetFields()
    }, [form, account.editing]);

    const formData = {
        id: 100,
        title: "Event SBMCXNoZPP",
        ownersId: "",
        //test: console.log("testteando",account)  
        ownersId: account.owners.map((owner) => owner._id)
    };

    let tmpSelectedUsersVnew = account.owners.map((owner) => {
        return { value: owner._id, label: owner.fullName };
    });

    const [selectedUsersVnew, setSelectedUsersVnew] = useState(tmpSelectedUsersVnew);

    function updateSelectedUsersVnew(value) {
        let tmpArray = [];

        for (let i = 0; i < value.length; i++) {
            if (value[i] !== undefined) {
                tmpArray.push(value[i]);
            }
        }
        setSelectedUsersVnew(tmpArray);
        setAccount({ ...account, owners: tmpArray });
    }

    const filteredOptionsVnew = owners.filter((owner) => !selectedUsersVnew.includes(owner));

    const onFinish = async (values) => {
        try {
            if (account.editing) {

                await updateAccountRequest({ ...account, balance: 0 });
            } else {
                await createAccountRequest({ ...account, balance: 0 });
            }

            if (typeof (ownerId) === "undefined") {
                navigate(`/accounts`);
            } else {
                navigate(`/owner/${ownerId}/accounts`);
            }
        } catch (error) {
            //setErrors(error);
            showError(error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const showError = (error) => {
        messageApi.open({
            type: 'error',
            content: error.response.data.message,
        });
    };

    const handle_select_account_type = (value, key) => {
        setAccount({ ...account, accountType: key.key });
    }

    const handleChange = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value });
    };

    const handleNumberChange = (value) => {
        setAccount({ ...account, balance: Math.round(value * 100) / 100 });
    };


    const cancel = async () => {
        //navigate(`/owner/${ownerId}/accounts`);
        navigate(-1);
    }

    return (
        <>
            {contextHolder}
            {/*console.log("cuenta", account)*/}
            <Form layout="vertical" initialValues={formData} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item label="Número de cuenta" name="number" placeholder="Número de cuenta" initialValue={account.number} rules={[
                    {
                        required: true,
                        pattern: new RegExp(/^[0-9]*$/),
                        message: 'Por favor ingresar número de cuenta.',
                    },
                    {
                        min: 10,
                        message: 'El número de cuenta debe poseer al menos 10 números.'
                    },
                    {
                        max: 10,
                        message: 'El número de cuenta debe poseer como máximo 10 números.'
                    }
                ]}
                >
                    <Input name="number" onChange={handleChange} />
                </Form.Item>
                <Form.Item name={"ownersId"} label="Titulares" rules={[
                    {
                        required: true,
                        message: 'Por favor seleccionar un Titular.',
                        type: 'array',
                    },
                ]}
                >
                    <Select
                        fieldNames={{ label: "fullName", value: "id" }}
                        mode="multiple"
                        onChange={updateSelectedUsersVnew}
                        optionFilterProp={"fullName"}
                        optionLabelProp={"fullName"}
                        options={filteredOptionsVnew.map((item) => ({
                            id: item._id,
                            fullName: item.fullName
                        }))}
                        placeholder="Add participants"
                        showSearch={true}
                        style={{
                            width: "100%"
                        }}
                        value={owners}
                    />
                </Form.Item>
                <Form.Item name="accountType" label="Tipo" initialValue={account.accountType.description} rules={[
                    {
                        required: true,
                        message: 'Por favor seleccionar un tipo de cuenta.',
                    },
                ]}
                >
                    <Select placeholder="Seleccionar un tipo de cuenta" onChange={handle_select_account_type}>
                        {accountTypes.map((accountType) => {
                            return (
                                <Select.Option key={accountType._id} value={accountType.description}>
                                    {accountType.description}
                                </Select.Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Saldo" name="balance" initialValue={account.balance} rules={[
                    {
                        required: true,
                        message: 'Por favor ingresar un saldo.',
                    },
                ]}
                >
                    <Input disabled name="balance" onChange={handleNumberChange} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Guardar
                    </Button>
                    <Button onClick={() => cancel()}>
                        Cancelar
                    </Button>
                </Form.Item>
            </Form >
            {/*errors.map((error, i) => (
                    <Alert message={error} key={i} type="error" showIcon />
                    //console.log(error);
            ))*/}
        </>
    );
}