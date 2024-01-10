import React from "react";
import { Modal } from "antd";
import { useMutation } from "@apollo/client";
import { DataType } from "../../pages";
import { GET_TASKS } from "../../../graphql/queries/getTasks";
import { DELETE_TASK } from "../../../graphql/mutations/deleteTask";

interface Props {
  show: boolean;
  data?: DataType;
  setShow: () => void;
}

const DeleteModal: React.FC<Props> = ({ show, data, setShow }) => {
  const [deleteTask] = useMutation(DELETE_TASK);

  const handledelete = () => {
    deleteTask({
      variables: { id: data?._id },
      refetchQueries: [GET_TASKS],
    });
    setShow();
  };

  return (
    <>
      <Modal
        title="Delete task"
        open={show}
        onOk={handledelete}
        onCancel={setShow}
        okButtonProps={{ danger: true }}
        okText="Delete"
      >
        <p>Are you sure, you want to delete this task?</p>
        <p>After this step you cannot get this task back again</p>
      </Modal>
    </>
  );
};

export default DeleteModal;
