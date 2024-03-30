import React from 'react';
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { DatePicker, Alert, Button, Form, Input } from 'antd';
import { getTransactionRequest, createTransactionRequest, updateTransactionRequest } from "../api/transactions";
import moment from 'moment';

export function TransactionCRUPage() {
    const { id, accountId } = useParams();
    const dateFormat = 'DD/MM/YYYY';
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [errors, setErrors] = useState([]);   
    const [transaction, setTransaction] = useState({
        _id: "",
        account: accountId,
        date: moment(),
        notes: "",
        amount: "",
        editing: false
    });

    useEffect(() => {
        async function fetchData() {
            const transactionId = id;
            if (transactionId) {
                const res = await getTransactionRequest(transactionId);
                setTransaction({
                    _id: transactionId,
                    account: res.data.account,
                    date: moment(res.data.date),
                    notes: res.data.notes,
                    amount: res.data.amount,
                    editing: true
                });
            }
        }
        fetchData();
        form.resetFields()
        /*form.setFieldsValue({
            givenName: user.givenName
        });*/
    }, [form, transaction.editing]);


    const onFinish = async (values) => {
        try {
            if (transaction.editing) {
                await updateTransactionRequest(transaction);
            } else {
                await createTransactionRequest(transaction);
            }
            navigate(-1);
        } catch (error) {
            console.log(error);
            setErrors(error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onDateChange = (date, dateString) => {
        setTransaction({
            ...transaction,
            date, date
        });
    };
    const handleChange = (e) => {
        setTransaction({ ...transaction, [e.target.name]: e.target.value });
    };

    const cancel = async () => {
        navigate(-1);
    }

    const formData = {
        id: 100,
        title: "Event SBMCXNoZPP",
        date: transaction.date,
        notes: transaction.notes,
        amount: transaction.amount
    };

    return (
        <>
            <h1>Transaction CRUD</h1>

            <Form layout="vertical" initialValues={formData} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>

                <Form.Item name={"date"} label="Fecha"  rules={[
                    {
                        required: true,
                        message: 'Por favor ingresar Fecha.',
                    },
                ]}>
                    <DatePicker initialValue={transaction.date}
                     
                        format={dateFormat}
                        onChange={onDateChange}
                    />
                </Form.Item>

                <Form.Item label="Detalle" name={"notes"} placeholder="Detalle" initialValue={transaction.notes} rules={[
                    {
                        required: true,
                        message: 'Por favor ingresar Detalle.',
                    },
                ]}
                >
                    <Input name="notes" onChange={handleChange} />
                </Form.Item>

                <Form.Item label="Importe" name={"amount"} placeholder="0,00" initialValue={transaction.amount} rules={[
                    {
                        required: true,
                        message: 'Por favor ingresar un importe.',
                    },
                ]}
                >
                    <Input name={"amount"} onChange={handleChange} />
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
        </>
    )
}