import { useCallback, useEffect, useState } from "react";
import { Button, Form, Input, Modal, Table, Select, Image } from "antd";
import { request } from "../../server/request";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { IMG_URL } from "../../const";
const { TextArea } = Input;

const provinceData = [
  { value: "63de2fc268d03b5daea7c6a6", label: " Business" },
  { value: "63de6eb268d03b5daea7dbca", label: "Startup" },
  { value: "63deced968d03b5daea7ec6c", label: "Economy" },
  { value: "63decf1468d03b5daea7ec6f", label: "Technology" },
];

const MyPostsP = () => {
  const [form] = Form.useForm();
  const [mypost, setMypost] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [tags, setTags] = useState(["man", "fashion"]);
  const [uplodImg, setUplodImg] = useState();
  const [selected, setSelected] = useState(null);

  const getPost = useCallback(async () => {
    try {
      let { data } = await request.get("post/user");
      console.log(data);
      setMypost(data.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getPost();
  }, [getPost]);

  const handleChangeImg = async (e) => {
    try {
      const form = new FormData();
      form.append("file", e.target.files[0]);
      let data = await request.post("upload", form);
      setUplodImg(data?.data?._id);
    } catch (err) {
      console.log(err);
    }
  };

  const showModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const submit = async () => {
    try {
      let values = await form.validateFields();
      values.tags = ["man", "fashion"];
      values.photo = uplodImg;

      console.log(values);
      if (selectedPost) {
        await request.put(`post/${selected}`, values);
      } else {
        await request.post("post", values);
      }
      form.resetFields();
      hideModal();
      getPost();
    } catch (err) {
      console.log(err);
    }
  };

  const addTeacher = () => {
    showModal();
    setSelected(null);
  };

  async function editTeacher(id) {
    try {
      let { data } = await request.get(`post/${id}`);
      form.setFieldsValue(data);
      setSelected(id);
      showModal();
    } catch (err) {
      console.log(err);
    }
  }

  function deleteTeacher(id) {
    Modal.confirm({
      title: "Do you want to delete this post?",
      onOk: async () => {
        try {
          await request.delete(`post/${id}`);
          getPost();
        } catch (err) {
          console.log(err);
        }
      },
    });
  }

  console.log(mypost);
  console.log(uplodImg);
  return (
    <>
      <Table
        title={() => (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
                marginTop: "100px",
              }}
            >
              <Input />
              <Button onClick={addTeacher} type="primary">
                Add post
              </Button>
            </div>
            <section>
              <section className="dark">
                <div className="container py-4">
                  {mypost.map((pr, index) => (
                    <div key={index} className="postcard dark blue">
                      <div className="postcard__text">
                        <Link className="postcard__img_link" href="#">
                          <Image
                            src={
                              IMG_URL +
                              pr.photo._id +
                              "." +
                              pr.photo.name.split(".")[1]
                            }
                            alt="Photo"
                          />
                        </Link>
                        <h1 className="postcard__title blue">
                          <p>{pr.title}</p>
                        </h1>
                        <div className="postcard__subtitle small">
                          <time>
                            {format(new Date(pr.createdAt), "MMM d, yyyy")}
                          </time>
                        </div>
                        <div className="postcard__bar"></div>
                        <div className="postcard__preview-txt">
                          {pr.description}
                        </div>
                        <div className="postcard__tagbox">
                          <Button
                            onClick={() => editTeacher(pr._id)}
                            className="tag__item"
                          >
                            <EditOutlined
                              style={{
                                fontSize: "26px",
                                color: "green",
                                gap: "15px",
                              }}
                            />
                          </Button>
                          <Button
                            onClick={() => deleteTeacher(pr._id)}
                            className="tag__item"
                          >
                            <DeleteOutlined
                              style={{ fontSize: "26px", color: "red" }}
                            />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </section>
          </div>
        )}
      />
      <Modal
        open={isModalOpen} // "open" o'rniga "visible" ishlatilgan
        okText={selectedPost ? "Save" : "Add"} // tugma matnini to'g'irlash
        onCancel={hideModal}
        onOk={submit}
        title="Adding post"
      >
        <input type="file" onChange={handleChangeImg} />
        <Form
          initialValues={{
            title: selectedPost ? selectedPost.title : "",
            category: selectedPost
              ? selectedPost.category._id
              : provinceData[0],
            photo: {
              url: selectedPost ? selectedPost.photo : "",
              name: selectedPost ? selectedPost.name : "",
            },
            tavsif: selectedPost ? selectedPost.description : "",
          }}
          form={form}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            rules={[
              {
                required: true,

                message: "Please fill this field !",
              },
            ]}
            name="title"
            label="Title"
          >
            <Input />
          </Form.Item>
          <Form.Item name="tags" label="Teglar">
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Teglar kiriting"
              onChange={(tagValues) => setTags(tagValues)}
              value={tags}
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please fill this field !",
              },
            ]}
            name="description"
            label="Description"
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please fill this field !",
              },
            ]}
            name="category"
            label="Category"
          >
            <Select>
              {provinceData.map((province) => (
                <Select.Option key={province.value} value={province.value}>
                  {province.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MyPostsP;
