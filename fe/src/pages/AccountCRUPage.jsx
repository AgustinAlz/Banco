import React from 'react';
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Button, Select, Form, Input } from 'antd';
import { getAccountTypesRequest } from "../api/accountTypes";
import { getAccountsRequest, getAccountRequest, createAccountRequest, updateAccountRequest } from "../api/accounts";
import { getUsersRequest, getUserRequest } from '../api/users';
import { useAuth } from "../context/authContext";
import { accountSchema } from "../schemas/account";
import { zodResolver } from "@hookform/resolvers/zod";

//https://codesandbox.io/p/sandbox/antd-reproduction-template-forked-8gkete?file=%2Findex.js%3A77%2C54-77%2C70

export function AccountCRUPage() {
    const { user } = useAuth();
    const { id } = useParams();
    const { ownerId } = useParams();
    const [accountTypes, setAccountTypes] = useState([]);
    const [owners, setOwners] = useState([]);
    const [userOwner, setUserOwner] = useState([]);
    const [errors, setErrors] = useState([]);
    const [account, setAccount] = useState({
        _id: "",
        number: "",
        owners: [],
        accountType: "",
        balance: 0,
        editing: false
    }
    );
    const navigate = useNavigate();
    const [form] = Form.useForm();
    //const [form] = Form.useForm({resolver: zodResolver(accountSchema)});

    useEffect(() => {
        async function fetchData() {
            const responseAccountTypes = await getAccountTypesRequest();
            setAccountTypes(responseAccountTypes.data);
            const responseOwners = await getUsersRequest();
            setOwners(responseOwners.data);
            const responseAccountOwner = await getUserRequest(ownerId);
            setUserOwner(responseAccountOwner.data);

            const accountId = id;
            if (accountId) {
                const res = await getAccountRequest(accountId);
                setAccount({
                    _id: accountId,
                    number: res.data.number,
                    owners: res.data.owners,
                    accountType: res.data.accountType,
                    balance: res.data.balance,
                    editing: true
                });
                console.log(res.data);
            }
        }
        fetchData();
        form.resetFields()
    }, [form, account.editing]);

    const formData = {
        id: 100,
        title: "Event SBMCXNoZPP",
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
                await updateAccountRequest(account);
                console.log("Editando", account);
            } else {
                await createAccountRequest(account);
                console.log("Creando", account);
            }
            navigate(`/owner/${ownerId}/accounts/`)
        } catch (error) {
            console.log(error);
            setErrors(error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handle_select_account_type = (value, key) => {
        setAccount({ ...account, accountType: key.key });
    }

    const handleChange = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value });
    };

    const cancel = async () => {
        navigate(`/owner/${ownerId}/accounts/`);
    }

    return (
        <>
            <Form layout="vertical" initialValues={formData} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item label="Número de cuenta" name="number" placeholder="Número de cuenta" initialValue={account.number} rules={[
                    {
                        required: true,
                        message: 'Por favor ingresar número de cuenta.',
                    },
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
                    <Input name="balance" onChange={handleChange} />
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