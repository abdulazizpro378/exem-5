import { Button, Form, Image, Modal } from "antd";
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState, useEffect } from "react";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const MyPostsP = () => {
  const [search, setSearch] = useState("");
  const [respon, setRespon] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const localData = localStorage.getItem("myPosts");
    if (localData) {
      setRespon(JSON.parse(localData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("myPosts", JSON.stringify(respon));
  }, [respon]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const submit = async () => {
    try {
      let values = await form.validateFields();
      setRespon((prevRespon) => [...prevRespon, { ...values, id: Date.now() }]);
      form.resetFields();
      hideModal();
    } catch (err) {
      console.log(err);
    }
  };

  const addTeacher = () => {
    showModal();
    setSelected(null);
  };

  const searchPosts = () => {
    const filteredRespon = respon.filter((post) =>
      post.description.includes(search)
    );
    return filteredRespon;
  };

  const deleteTeacher = (id) => {
    setRespon((prevRespon) => prevRespon.filter((post) => post.id !== id));
  };


  const editTeacher = (id) => {
    const postToEdit = respon.find((post) => post.id === id);
    if (postToEdit) {
      form.setFieldsValue(postToEdit);
      setSelected(id);
      showModal();
    }
  };
  
  const submitEdit = async () => {
    try {
      let values = await form.validateFields();
     
      const postIndex = respon.findIndex((post) => post.id === selected);
      if (postIndex !== -1) {
        setRespon((prevRespon) => {
          const updatedRespon = [...prevRespon];
          updatedRespon[postIndex] = { ...values, id: selected };
          return updatedRespon;
        });
      }
      form.resetFields();
      hideModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section id="slider">
      <div className="container">
        <div className="slider-paragraph my-3">
          <h2>My posts</h2>
        </div>
        <div className="search-my-post d-flex my-4">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="serach"
          />
          <Button
            className=" btn-succes"
            style={{ width: "120px", height: "60px" }}
            onClick={addTeacher}
            type="primary"
          >
            Add Post
          </Button>
        </div>
        <Modal
          title="Adding"
          open={isModalOpen}
          onOk={selected ? submitEdit : submit}
          okText={selected ? "Save" : "Add"}
          onCancel={hideModal}
        >
          <Form
            initialValues={{
              isMarried: false,
            }}
            form={form}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              name="title"
              label="title"
              rules={[
                {
                  required: true,
                  message: "Please fill this field!",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>

            <Form.Item
              name="Tags"
              label="Tags"
              rules={[
                {
                  required: true,
                  message: "Please fill this field!",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="category"
              label="category"
              rules={[
                {
                  required: true,
                  message: "Please fill this field!",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>

            <Form.Item
              name="id"
              label="id"
              rules={[
                {
                  required: true,
                  message: "Please fill this field!",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please fill this field!",
                },
                { type: "", warningOnly: true },
                { type: "string", min: 6 },
              ]}
              name="image"
              label="Image"
            >
              <Input  />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <TextArea rows={4} />
            </Form.Item>
          </Form>
        </Modal>
        <div className="owl-carousel">
          <div className="boxs">
            <div className="container posts_row my-4">
              {searchPosts().map((res, index) => (
                <div key={index}>
                  <div className="box">
                    <div className="box-left">
                      <Image src={res.image} />
                    </div>
                    <div className="box-right">
                      <h2 className="p-2  ">Title: {res.title}</h2>
                      <p> Tagas:{res.Tags}</p>
                      <span>{res.category}</span> <span>id:{res.id}</span>
                      <p className="p-2">{res.description}</p>
                      <div className="action-btns d-flex gap-3">
                        <Button
                          onClick={() => editTeacher(res.id)}
                          type="primary"
                          icon={<EditOutlined />}
                        />
                        <Button
                          onClick={() => deleteTeacher(res.id)}
                          type="primary"
                          danger
                          icon={<DeleteOutlined />}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyPostsP;
