import React from "react";

import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Button, Select, Form, Input } from 'antd';
import { getAccountTypesRequest } from "../api/accountTypes";
import { getAccountsRequest, getAccountRequest, createAccountRequest, updateAccountRequest } from "../api/accounts";
import { getUsersRequest, getUserRequest } from '../api/users';
//import { accountSchema } from "../schemas/account";
//import { zodResolver } from "@hookform/resolvers/zod";


//https://codesandbox.io/p/sandbox/antd-reproduction-template-forked-8gkete?file=%2Findex.js%3A77%2C54-77%2C70

export function AccountCRUPageVtwo() {

  const { id } = useParams();
  const { ownerId } = useParams();
  const [accountTypes, setAccountTypes] = useState([]);
  const [owners, setOwners] = useState([]);
  const [userOwner, setUserOwner] = useState([]);
  const [errors, setErrors] = useState([]);
  const [account, setAccount] = useState({
    _id: "",
    number: "",
    owners: [{}],
    accountType: "",
    balance: 0,
    editing: false
  }
  );
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const formItemLayoutWithOutLabel = { wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 20, offset: 4 } } };

  const userData = [
    { id: 2598, name: "Lightfoot Boromir" },
    { id: 3997, name: "Gonzales Fredrick" },
    { id: 3210, name: "Patterson Juan" },
    { id: 2060, name: "Jackson Rob" },
    { id: 32, name: "Zombie Michael" },
    { id: 3032, name: "Blackmount Morticia" },
    { id: 2177, name: "Reagan Elisabeth" },
    { id: 2254, name: "Gosling Benedict" },
    { id: 315, name: "Kennedy Ryan" }
  ];

  const participants = [
    {
      id: 2254,
      username: "c63b8061-60fc-46af-b54d-5f86a27d3b37445@test.tld",
      firstName: "Benedict",
      lastName: "Gosling",
      phoneNumber: "97878723085",
      registered: "2017-11-25T20:13:39.743910Z",
      diveCount: 1
    },
    {
      id: 2177,
      username: "49c8e7b8-24d8-4010-b5b3-fe426375b06a3803@test.tld",
      firstName: "Elisabeth",
      lastName: "Reagan",
      phoneNumber: "56124091731",
      registered: "2022-07-04T20:17:26.560246Z",
      diveCount: 1
    },
    {
      id: 3032,
      username: "ed860fb1-0b61-4cd1-820b-851261f8c0974520@test.tld",
      firstName: "Morticia",
      lastName: "Blackmount",
      phoneNumber: "71045191438",
      registered: "2020-10-12T20:18:14.926882Z",
      diveCount: 1
    }
  ];

  const formData = {
    id: 114,
    title: "Event SBMCXNoZPP",
    participantsIds: participants.map((item) => item.id)
  };

  let tmpSelectedUsers = participants.map((user) => {
    return { value: user.id, label: user.firstName + " " + user.lastName };
  });

  const [selectedUsers, setSelectedUsers] = useState(tmpSelectedUsers);

  console.log("Selected Users:");
  console.log(selectedUsers);

  function updateSelectedUsers(value) {
    console.log("updateSelectedUsers:");
    console.log(value);
    let tmpArray = [];

    for (let i = 0; i < value.length; i++) {
      console.log("Checking value: " + value[i]);
      if (value[i] !== undefined) {
        console.log("Pushing value: " + value[i]);
        tmpArray.push(value[i]);
      }
    }

    

    console.log("TmpArray:");
    console.log(tmpArray);

    setSelectedUsers(tmpArray);

    console.log("Selected Users:");
    console.log(selectedUsers);
  }



  const filteredOptions = userData.filter((o) => !selectedUsers.includes(o));

  useEffect(() => {
    async function fetchData() {
      const responseAccountTypes = await getAccountTypesRequest();
      setAccountTypes(responseAccountTypes.data);
      const responseOwners = await getUsersRequest();
      setOwners(responseOwners.data);
      //setUserData(responseOwners.data);
      //setSelectedUsers(tmpSelectedUsers);

      if (ownerId) {
        const responseAccountOwner = await getUserRequest(ownerId);
        setUserOwner(responseAccountOwner.data);
      }

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
        //setParticipants(res.data.owners);
      }
    }
    fetchData();
    form.resetFields()
    /*form.setFieldsValue({
        givenName: user.givenName
    });*/
  }, [form, account.editing]);

  let tmpSelectedUsersVtwo = account.owners.map((owner) => {
    return { value: owner._id, label: owner.fullName };
  });
  const [selectedUsersVtwo, setSelectedUsersVtwo] = useState(tmpSelectedUsersVtwo);

  const filteredOptionsTwo = account.owners.filter((o) => !selectedUsersVtwo.includes(o));

  const formDataTwo = {
    id: 100,
    title: "Event SBMCXNoZPP",
    participantsIds: account.owners.map((item) => item._id)
  };

  const [selectedUsersvTwo, setSelectedUsersVtw] = useState(tmpSelectedUsersVtwo);

  
  console.log("Selected Users V2:");
  console.log(selectedUsersVtwo);

  function updateSelectedUsersVtwo(value) {
    console.log("updateSelectedUsersVtwo:");
    console.log(value);
    let tmpArray = [];

    for (let i = 0; i < value.length; i++) {
      console.log("Checking value: " + value[i]);
      if (value[i] !== undefined) {
        console.log("Pushing value: " + value[i]);
        tmpArray.push(value[i]);
      }
    }
 

    console.log("TmpArrayVtwo:");
    console.log(tmpArray);

    setSelectedUsersVtw(tmpArray);

    console.log("Selected UsersVtwo:");
    console.log(selectedUsers);
  }

  const onFinish = (values) => {
    console.log("Selected users:");
    console.log(selectedUsers);
    console.log("filteredOptions:");
    console.log(filteredOptions);

    console.log("Received values of form:", values);
  };

  const handleChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Form
        form={form}
        name="dynamic_form_item"
        {...formItemLayoutWithOutLabel}
        onFinish={onFinish}
        initialValues={formData}
        style={{
          maxWidth: 600
        }}
      >
        <Form.Item label="Número de cuenta" name="number" placeholder="Número de cuenta" initialValue={account.number} rules={[
          {
            required: true,
            message: 'Por favor ingresar número de cuenta.',
          },
        ]}
        >
          <Input name="number" onChange={handleChange} />
        </Form.Item>

        <Form.Item name={"participantsIds"}>
          <Select
            fieldNames={{ label: "name", value: "id" }}
            mode="multiple"
            onChange={updateSelectedUsers}
            optionFilterProp={"name"}
            optionLabelProp={"name"}
            options={filteredOptions.map((item) => ({
              id: item.id,
              name: item.name
            }))}
            placeholder="Add participants"
            showSearch={true}
            style={{
              width: "100%"
            }}
            value={userData}
          />
        </Form.Item>
       
        <Form.Item name={"participantsIds"}>
          <Select
            fieldNames={{ label: "fullName", value: "_id" }}
            mode="multiple"
            onChange={updateSelectedUsersVtwo}
            optionFilterProp={"fullName"}
            optionLabelProp={"fullName"}
            options={filteredOptionsTwo.map((item) => ({
              id: item._id,
              name: item.fullName
            }))}
            placeholder="Add participants"
            showSearch={true}
            style={{
              width: "100%"
            }}
            value={account.owners}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
          <Button onClick={() => cancel()}>
            Cancelar
          </Button>
        </Form.Item>


      </Form>
    </div>
  );
}