import React, { useState } from 'react';
import { Button, Table, Modal, Input, Popconfirm } from 'antd';

const Users = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [userKey, setkey] = useState("");
    const [users,setUsers] = useState(localStorage.getItem('users') == null ? Array : JSON.parse(localStorage.getItem('users')));
    const handleDelete = (key) => {
      const users2 = [...users];      
      const newarr = users2.filter((item) => item.key !== key);
      setUsers(newarr);         
      localStorage.setItem('users',JSON.stringify(newarr));
    };
    const columns = [
      {
        title: 'Name',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render:(_, record) =>
        users.length >= 1 ? (
            <div>
              <a href="javascript:;" onClick={() => showEditModal(record.key,record)}>Edit</a> |&nbsp; 
              <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                <a>Delete</a>
              </Popconfirm>
            </div>
        ) : null
      },    
    ];  

    const showModal = () => {
        setIsModalVisible(true);
    }; 

    const showEditModal = (key,record) => {
        setUserName(record.username);
        setEmail(record.email);
        setkey(key)
        setIsEditModalVisible(true);
    };   

    const handleOk = async () => {
        setConfirmLoading(true);
        const wait = async (duration= 1000) => {
            await new Promise(resolve => setTimeout(resolve,duration));
        }
        if(users.length > 0){            
            users.push({
                key:users.length,
                username:username,
                email:email
            });            
        }
        else{            
            users.push({
                key:0,
                username:username,
                email:email
            });
        }
        localStorage.setItem('users',JSON.stringify(users));           
        await wait(2000);        
        setUserName("");
        setEmail("");
        setConfirmLoading(false);
        setIsModalVisible(false);
        setUsers(JSON.parse(localStorage.getItem('users')));        
    };

    const handleEidtOk = async (key) => {
        console.log(key);
        setConfirmLoading(true);
        const wait = async (duration= 1000) => {
            await new Promise(resolve => setTimeout(resolve,duration));
        }
        const users2 = [...users];
        users2.forEach((value,index) => {
            if(key === index){
                value.username = username;
                value.email = email;
                localStorage.setItem('users',JSON.stringify(users2));
            }
        })
        await wait(2000);        
        setUserName("");
        setEmail("");
        setConfirmLoading(false);
        setIsEditModalVisible(false);
        setUsers(JSON.parse(localStorage.getItem('users')));
    }

    const handleCancel = () => {        
        setIsModalVisible(false);
        setUserName("");
        setEmail("");
    };

    const handleEditCancel = () => {        
        setIsEditModalVisible(false);
        setUserName("");
        setEmail("");
    };

    return (
        <div>
            <Button type="primary" onClick={showModal}>Create Users</Button>        
            <Modal title="Add Users" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} confirmLoading={confirmLoading}>
                <Input placeholder="Username" onChange={(e)=>{setUserName(e.target.value)}} value={username}/>
                <Input placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
            </Modal>
            <Modal title="Edit Users" visible={isEditModalVisible} onOk={() => handleEidtOk(userKey)} onCancel={handleEditCancel} confirmLoading={confirmLoading}>
                <Input placeholder="Username" onChange={(e)=>{setUserName(e.target.value)}} value={username}/>
                <Input placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
            </Modal>
            <Table dataSource={users} columns={columns}/>
        </div>
    );
}

export default Users;