import React, { useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Space } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CREATE_TASK } from "../../../graphql/mutations/createTask";
import { GET_TASKS } from "../../../graphql/queries/getTasks";

const { TextArea } = Input;

interface FormSchema {
  title: string;
  description?: string;
}

interface Props {
  show: boolean;
  setShow: () => void;
}

const CreateTaskModal: React.FC<Props> = ({ show, setShow }) => {
  const { register, handleSubmit, reset, setValue } = useForm<FormSchema>();

  const [createTask] = useMutation(CREATE_TASK);

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    await createTask({
      variables: data,
      refetchQueries: [GET_TASKS],
    });
  };

  return (
    <>
      <Modal
        title="Add New Task"
        open={show}
        footer={[]}
        onCancel={() => setShow()}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <label>First Name</label>
          <input style={{}} {...register("title")} />
          <label>Gender Selection</label>
          <input {...register("description")} />
          <input type="submit" /> */}

          <Input
            {...register("title", { required: true })}
            placeholder="Enter title"
            onChange={(data) => setValue("title", data.target.value)}
            style={{ marginTop: "16px", marginBottom: "16px" }}
          />

          <Input.TextArea
            {...register("description", { required: true })}
            placeholder="Enter description"
            onChange={(data) => setValue("description", data.target.value)}
          />

          <Space style={{ marginTop: "16px" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={() => reset()} htmlType="button">
              Reset
            </Button>
          </Space>
        </form>
      </Modal>
    </>
  );
};

export default CreateTaskModal;
