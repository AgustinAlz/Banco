import React from 'react';
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Button, Select, Form, Input } from 'antd';
import { getRolesRequest } from "../api/roles";
import { getUsersRequest, getUserRequest, createUserRequest, updateUserRequest } from "../api/users";
//import { userSchema } from "../schemas/user";
//import { zodResolver } from "@hookform/resolvers/zod";

export function UserCRUPage() {
    const { id } = useParams();
    const [roles, setRoles] = useState([]);
    const [resetPassword, setResetPassword] = useState(false);
    const [errors, setErrors] = useState([]);
    const [user, setUser] = useState({
        _id: "",
        givenName: "",
        lastName: "",
        email: "",
        role: "",
        updatePassword: resetPassword,
        password: "",
        editing: false
    }
    );
    const navigate = useNavigate();
    const [form] = Form.useForm();
    //const [form] = Form.useForm({resolver: zodResolver(userSchema)});


    useEffect(() => {
        async function fetchData() {
            const response = await getRolesRequest();
            setRoles(response.data);

            const userId = id;
            if (userId) {
                const res = await getUserRequest(userId);
                setUser({
                    _id: userId,
                    givenName: res.data.givenName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    role: res.data.role,
                    updatePassword: resetPassword,
                    password: "",
                    editing: true
                });
            }
        }
        fetchData();
        form.resetFields()
        form.setFieldsValue({
            givenName: user.givenName
        });
    }, [form, user.editing]);

    const onFinish = async (values) => {
        try {
            if (user.editing) {
                await updateUserRequest(user);
            } else {
                await createUserRequest(user);
            }
            navigate("/users")
        } catch (error) {
            console.log(error);
            setErrors(error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handle_select_role = (value, key) => {
        setUser({ ...user, role: key.key });
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setUser({ ...user, password: e.target.value });
    };

    const doResetPassword = (e) => {
        setResetPassword(true);
        setUser({ ...user, updatePassword: true });
    };

    const cancel = async () => {
        navigate("/users");
    }

    return (
        <>
            {/*console.log(user)*/}
            <Form layout="vertical" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item label="Nombre" name="givenName" placeholder="Nombre" initialValue={user.givenName} rules={[
                    {
                        required: true,
                        message: 'Por favor ingresar nombre.',
                    },
                ]}

                >
                    <Input name="givenName" onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Apellido" name="lastName" placeholder="Apellido" initialValue={user.lastName} rules={[
                    {
                        required: true,
                        message: 'Por favor ingresar apellido.',
                    },
                ]}
                >
                    <Input name="lastName" onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Correo Electrónico" name="email" initialValue={user.email} rules={[
                    {
                        required: true,
                        message: 'Por favor ingresar correo electrónico.',
                    },
                ]}
                >
                    <Input name="email" onChange={handleChange} />
                </Form.Item>
                <Form.Item name="role" label="Rol" initialValue={user.role.description} rules={[
                    {
                        required: true,
                        message: 'Por favor seleccionar un rol.',
                    },
                ]}
                >
                    <Select placeholder="Seleccionar un rol" onChange={handle_select_role}>
                        {roles.map((role) => {
                            return (
                                <Select.Option key={role._id} value={role.description}>
                                    {role.description}
                                </Select.Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                {(resetPassword || !user.editing) ? (
                    <>
                        <Form.Item label="Contraseña" name="password" hasFeedback rules={[
                            {
                                required: true,
                                message: 'Por favor ingresar una contraseña.',
                            },
                        ]}
                        >
                            <Input.Password name="password" onChange={handlePasswordChange} />
                        </Form.Item>
                    </>
                ) : (
                    <Form.Item>
                        <Button onClick={doResetPassword}>Reset Contraseña</Button>
                    </Form.Item>
                )}
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