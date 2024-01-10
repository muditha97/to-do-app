import React, { useState } from "react";
import { Button, Modal } from "antd";
import { DataType } from "../../pages";
import { useMutation } from "@apollo/client";
import { UPDATE_TASK } from "../../../graphql/mutations/updateTask";
import { GET_TASKS } from "../../../graphql/queries/getTasks";

interface Props {
  show: boolean;
  setShow: () => void;
  data?: DataType;
}

const ModalComponent: React.FC<Props> = ({ show, setShow, data }) => {
  const [loading, setLoading] = useState(false);
  const [updateTask] = useMutation(UPDATE_TASK);

  const handleUpdateTask = async (id: string, completed: boolean) => {
    try {
      console.log("hit: ", data?._id);
      const x = await updateTask({
        variables: {
          completed: completed, // toggle completion status
        },
        refetchQueries: [GET_TASKS],
      });
      console.log("hitx");
      console.log(x);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <>
      <Modal
        open={show}
        title={data?.title}
        onOk={handleOk}
        onCancel={setShow}
        footer={[
          <Button key="back" onClick={setShow}>
            Close
          </Button>,
          <Button
            type="primary"
            loading={loading}
            onClick={() => {
              handleUpdateTask(data?._id || "", true);
            }}
          >
            Mark as Complete
          </Button>,
        ]}
      >
        <div>{data?.description}</div>
      </Modal>
    </>
  );
};

export default ModalComponent;
