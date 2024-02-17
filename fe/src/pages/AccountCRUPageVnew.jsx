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

export function AccountCRUPageVnew() {
  const formItemLayoutWithOutLabel = { wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 20, offset: 4 } } };
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

  useEffect(() => {
    async function fetchData() {
      const responseAccountTypes = await getAccountTypesRequest();
      setAccountTypes(responseAccountTypes.data);
      const responseOwners = await getUsersRequest();
      setOwners(responseOwners.data);

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

  console.log("Selected Users Vnew:");
  console.log(selectedUsersVnew);

  function updateSelectedUsersVnew(value) {
    console.log("updateSelectedUsersVnew:");
    console.log(value);
    let tmpArray = [];

    for (let i = 0; i < value.length; i++) {
      console.log("Checking valueVnew: " + value[i]);
      if (value[i] !== undefined) {
        console.log("Pushing valueVnew: " + value[i]);
        tmpArray.push(value[i]);
      }
    }
    console.log("TmpArrayVnew:");
    console.log(tmpArray);
    setSelectedUsersVnew(tmpArray);
    console.log("Selected UsersVnew:");
    console.log(selectedUsersVnew);
  }

  const filteredOptionsVnew = owners.filter((owner) => !selectedUsersVnew.includes(owner));


  const onFinish = (values) => {
    console.log("Selected users:");
    console.log(selectedUsersVnew);
    console.log("filteredOptions:");
    console.log(filteredOptionsVnew);

    console.log("Received values of form:", values);
  };

  const handleChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

/*<Form.Item name={"participantsIds"}>
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
        </Form.Item>*/

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

        
       
        <Form.Item name={"ownersId"}>
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