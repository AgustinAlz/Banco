import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Select, Input } from "antd";
import { EditOutlined, DeleteOutlined, FileAddOutlined } from '@ant-design/icons';
import { useUsers } from "../context/usersContext";
import { useRoles } from "../context/rolesContext";
import "../styles/Grid.css"
import { createUserRequest, deleteUserRequest, getUsersRequest, getUserRequest, updateUserRequest } from "../api/users";


const onSubmit = async (e) => {
    console.log(e)
    /*const res = await setNewUser({
        givenName: givenName,
        lastName: lastName,
        email: email,
        role: res.role,
        password: 123,
    })*/;
    console.log("Grabar con API");
    //setUsers(await userService.getUsers());
}


export function UserCreatePage() {
    const [newUser, setNewUser] = useState({
        _id: "",
        givenName: "",
        lastName: "",
        email: "",
        role: "",
        password: "",
        editing: false
    });

    const { form } = Form.useForm();
    const { id } = useParams();
    const { roles, getRoles } = useRoles();
    const { user, getUser } = useUsers();
    const navigate = useNavigate();

    const createUser = async (user) => {
        try {
          const res = await createUserRequest(user);
          //console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      };


    const editUser = (id) => {
        //navigate(`/users/${id}`)
    }


    useEffect(() => {
        async function fetchData() {
            //getRoles();
            //const response = await getRoles();
            //setRole(response);
            /*setUser({
                ...newUser,
                role: response[0].role.description
            });*/
            const userId = id;

            //console.log(userId);
            if (userId) {
                const res = getUser(userId);
                setNewUser({
                    _id: userId,
                    givenName: res.givenName,
                    lastName: res.lastName,
                    email: res.email,
                    role: res.role,
                    password: res.password,
                    editing: true
                });
            }
        }
        fetchData();
    }, []);

    const selectRole = (e) => {
        setNewUser({
            ...newUser,
            role: e
        });
    };

    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    };

    /*<Form.Item>
                        <Select
                            name="role"
                            showSearch
                            onChange={selectRole}
                            value={role.description}
                        >
                            {roles.map((role) => {
                                return (
                                    <Select.Option key={role._id} value={role.description}>
                                        {role.description}
                                    </Select.Option>
                                );
                            })};
                        </Select>
                    </Form.Item>*/
//<Form form={form} onFinish={onSubmit}>
    return (
        <>
            <p>user create</p>
            
            <Form name="Basic" onFinish={onSubmit}>
                <Form.Item>
                    <Input
                        type="text"
                        placeholder="nombre"
                        name="givenName"
                        onChange={handleChange}
                        value={newUser.givenName}
                        required>
                    </Input>
                </Form.Item>
                <Form.Item>
                    <Input
                        type="text"
                        placeholder="apellido"
                        name="lastName"
                        onChange={handleChange}
                        value={newUser.lastName}
                        required>
                    </Input>
                </Form.Item>
                <Form.Item>
                    <Input
                        type="email"
                        placeholder="email"
                        name="email"
                        onChange={handleChange}
                        value={newUser.email}
                        required>
                    </Input>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Guardar
                    </Button>
                    <Button className="cancel-button" onClick={() => cancel()}>
                        Cancelar
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}