import React from 'react';
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { DatePicker, Alert, Button, Form, Input, InputNumber } from 'antd';
import { Typography } from 'antd';
import { getTransactionRequest, createTransactionRequest, updateTransactionRequest } from "../api/transactions";
import { useAuth } from "../context/authContext";
import moment from 'moment';

export function TransactionCRUPage() {
    const { user } = useAuth();
    const { id, accountId, transactionType } = useParams();
    const dateFormat = 'DD/MM/YYYY';
    const { Title } = Typography;
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [errors, setErrors] = useState([]);
    const [transType, setTransType] = useState(transactionType);
    const [transaction, setTransaction] = useState({
        _id: "",
        account: accountId,
        date: moment(),
        notes: "",
        amount: "",
        transType,
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
                    amount: Math.abs(res.data.amount),
                    transType: res.data.transType,
                    editing: true
                });
                setTransType(res.data.transType);
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
                if(transType == 'extraction'){
                }
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

    /*const validateMessages = {
        required: '${label} is required!',
        types: {
          email: '${label} is not a valid email!',
          number: '${label} is not a valid number!',
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
      };*/

      //{transType = 'deposit' ? <Title level={2}><b>Depósito</b></Title> : <Title level={2}><b>Extracción</b></Title>}

    return (
        <>
            <Title level={2}><b>{transType == 'deposit' ? 'Depósito' : 'Extracción'}</b></Title>

            <Form layout="vertical" initialValues={formData} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} >

                <Form.Item name={"date"} label="Fecha" rules={[
                    {
                        required: true,
                        message: 'Por favor ingresar Fecha.',
                    },
                ]}>
                    <DatePicker disabled={!user.role.adminPermission} initialValue={transaction.date}

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
                        message: "El importe es requerido."
                    },
                    () => ({
                        validator(_, value) {
                            if (!value) {
                                return Promise.reject();
                            }
                            if (isNaN(value)) {
                                return Promise.reject("Por favor ingrese un número. ");
                            }
                            if (value <= 0) {
                                return Promise.reject("Por favor ingrese un número superior a cero.");
                            }
                            if ((value * 100) % 1 != 0) {
                                return Promise.reject("Sólo se puede insertar 2 decimales.");
                            }
                            return Promise.resolve();
                        },
                    }),
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
