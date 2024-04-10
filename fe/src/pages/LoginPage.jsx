import { useNavigate } from "react-router-dom";
import React from 'react';
import { useForm } from "react-hook-form";
import { Alert, Button, Checkbox, Form, Input } from 'antd';
//import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth, AuthProvider } from "../context/authContext";
import { useContext } from "react";


export function LoginPage() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    //const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) });
    const { signin, errors: loginErrors, isAuthenticated, user } = useAuth();

    const onSubmit = async (values) => {
        const u = await signin(values);
        u.role.adminPermission ? navigate("/users"): navigate(`/owner/${u.id}/accounts`);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >

            <Form.Item
                label="Correo Electrónico"
                name="email"
                initialValue="superadmin@bancochelo.com"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                {loginErrors.map((error, i) => (
                    <Alert message={error} key={i} type="error" showIcon />
                ))}
            </Form.Item>
        </Form>
    );
}
