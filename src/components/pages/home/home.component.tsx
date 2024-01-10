import React, { useState } from "react";
import { Flex, Typography, Layout, Button } from "antd";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { contentStyle, headerStyle } from "../../styles";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TASKS } from "../../../graphql/queries/getTasks";
import ModalComponent from "../../templates/view-modal/modal.component";
import { Spin } from "antd";
import DeleteModal from "../../templates/confirm-modal/confirm-modal.component";
import { CREATE_TASK } from "../../../graphql/mutations/createTask";
import CreateTaskModal from "../../templates/create-task-modal/create-task-modal.component";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

export interface DataType {
  key: string;
  _id: string;
  title: string;
  description: string;
}

const HomeComponent = () => {
  const { loading, data } = useQuery(GET_TASKS);

  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [state, setState] = useState<DataType>();

  const columns: ColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setState(record);
              setOpen(true);
            }}
          >
            View
          </Button>
          <Button type="primary">Edit</Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              setState(record);
              setDeleteModal(true);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // const data1: DataType[] = [
  //   {
  //     key: "1",
  //     title: "John Brown",
  //     description: "New York No. 1 Lake Park",
  //   },
  //   {
  //     key: "2",
  //     title: "Jim Green",
  //     description: "London No. 1 Lake Park",
  //   },
  //   {
  //     key: "3",
  //     title: "Joe Black",
  //     description: "Sydney No. 1 Lake Park",
  //   },
  // ];

  if (loading) {
    return <Spin />;
  }

  return (
    <div>
      <Flex gap="middle" wrap="wrap">
        <Layout style={{ height: "100vh" }}>
          <Header style={headerStyle}>
            <Title>To Do App</Title>
          </Header>
          <Content style={contentStyle}>
            <Button
              type="primary"
              size="large"
              onClick={() => setCreateModal(true)}
            >
              Add new
            </Button>
            <Table columns={columns} dataSource={data.tasks} />
          </Content>
          <Footer>Developed by Muditha Jayaweera</Footer>
        </Layout>
      </Flex>
      <ModalComponent
        show={open}
        setShow={() => {
          setOpen(false);
        }}
        data={state}
      />

      <DeleteModal
        data={state}
        setShow={() => setDeleteModal(false)}
        show={deleteModal}
      />

      <CreateTaskModal
        setShow={() => setCreateModal(false)}
        show={createModal}
      />
    </div>
  );
};

export default HomeComponent;
