
import React from 'react';
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Select, Form, Input } from 'antd';
import { getRolesRequest } from "../api/roles";
import { getUserRequest } from "../api/users";


const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export function UserCRUPage() {
    const { id } = useParams();
    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState({
        _id: "",
        givenName: "",
        lastName: "",
        email: "",
        role: "",
        password: "",
        editing: false
    }
    );
    const navigate = useNavigate();

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
                    password: res.data.password,
                    editing: true
                });
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <h1>Crear Usuario</h1>
            <Form
                layout="vertical"
                //name="user"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                //initialValues={initialValues}
                //initialValues={{user}}
                //initialValues={user}

                /*initialValues={{
                    givenName: user,
                    lastName: 'Test2',
                    email: 'test3',
                    role: 'user',
                    password: 'test4',
                }}*/
            >
                <Form.Item
                    label="Nombre"
                    placeholder="Nombre"
                    name="givenName"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingresar nombre.',
                        },
                    ]}
                    
                    initialValue={user.givenName}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Apellido"
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingresar apellido.',
                        },
                    ]}
                    initialValue={user.lastName}
                    
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Correo Electrónico"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingresar correo electrónico.',
                        },
                    ]}
                    initialValue={user.email}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="role"
                    label="Rol"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor seleccionar un rol.',
                        },
                    ]}
                    initialValue={user.role.description}
                >
                    <Select placeholder="Seleccionar un rol">
                        {roles.map((role) => {
                            return (
                                <Select.Option key={role._id} value={role.description}>
                                    {role.description}
                                </Select.Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Contraseña"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingresar una contraseña.',
                        },
                    ]}
                    hasFeedback
                    initialValue={user.password}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Guardar
                    </Button>
                </Form.Item>
            </Form >
        </>
    );
}