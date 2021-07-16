import React, { Component, useState } from 'react';
import { Button, Table, Modal, Input, Popconfirm } from 'antd';

const todos = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [todo, settodo] = useState("");
    const [todoKey, setkey] = useState("");    
    const [todos,settodos] = useState(localStorage.getItem('todos') == null ? Array : JSON.parse(localStorage.getItem('todos')));
    const handleDelete = (key) => {
      const todos2 = [...todos];      
      const newarr = todos2.filter((item) => item.key !== key);
      settodos(newarr);         
      localStorage.setItem('todos',JSON.stringify(newarr));
    };
    const columns = [
      {
        title: 'Todo',
        dataIndex: 'todo',
        key: 'todo',
      },
      {
        title:'Action',
        dataIndex: 'action',
        key: 'action',
        render: (_, record) => (
            todos.length >= 1 ? (
                <div>
                <a href="javascript:;" onClick={() => showEditModal(record.key,record)}>Edit</a> |&nbsp; 
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                    <a>Delete</a> 
                </Popconfirm> 
                </div>
            ) : null
        )
      }    
    ];  

    const showEditModal = (key,record) => {
        settodo(record.todo);
        setkey(key)
        const todos2 = [...todos];
        todos2.forEach((value,index) => {
            console.log(value);
            console.log(index);
        })
        // settodos(newarr);         
        setIsEditModalVisible(true);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleEdit = async (key) => {
        console.log(key);
        setConfirmLoading(true);
        const wait = async (duration= 1000) => {
            await new Promise(resolve => setTimeout(resolve,duration));
        }
        const todos2 = [...todos];
        todos2.forEach((value,index) => {
            if(key === index){
                value.todo = todo;
                localStorage.setItem('todos',JSON.stringify(todos2));
            }
        })
        await wait(2000);        
        settodo("");
        setConfirmLoading(false);
        setIsEditModalVisible(false);
        settodos(JSON.parse(localStorage.getItem('todos')));
    }    

    const handleOk = async () => {
        setConfirmLoading(true);
        const wait = async (duration= 1000) => {
            await new Promise(resolve => setTimeout(resolve,duration));
        }
        let d = new Date();
        if(todos.length > 0){                        
            todos.push({
                key:todos.length,
                todo:todo,
                dateadded: d
            });            
        }
        else{            
            todos.push({
                key:0,
                todo:todo,
                dateadded: d
            });
        }
        localStorage.setItem('todos',JSON.stringify(todos));           
        await wait(2000);        
        settodo("");
        setConfirmLoading(false);
        setIsModalVisible(false);
        settodos(JSON.parse(localStorage.getItem('todos')));        
    };

    const handleCancel = () => {        
        setIsModalVisible(false);
        settodo("");
    };

    const handleEditCancel = () => {
        setIsEditModalVisible(false);
    }

    return (
        <div>
            <Button type="primary" onClick={showModal}>Create todos</Button>        
            <Modal title="Add Todos" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} confirmLoading={confirmLoading}>
                <Input placeholder="todo" onChange={(e)=>{settodo(e.target.value)}} value={todo}/>
            </Modal>
            <Modal title="Edit Todos" visible={isEditModalVisible} onOk={() => handleEdit(todoKey)} onCancel={handleEditCancel} confirmLoading={confirmLoading}>
                <Input placeholder="todo" onChange={(e)=>{settodo(e.target.value)}} value={todo}/>
            </Modal>
            <Table dataSource={todos} columns={columns}/>
        </div>
    );
}

export default todos;