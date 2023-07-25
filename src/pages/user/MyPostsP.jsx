// import { Button, Form, Image, Modal } from "antd";
// import { Input } from "antd";
// import TextArea from "antd/es/input/TextArea";
// import { useState, useEffect } from "react";

// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

// const MyPostsP = () => {
//   const [search, setSearch] = useState("");
//   const [respon, setRespon] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selected, setSelected] = useState(null);
//   const [form] = Form.useForm();

//   useEffect(() => {
//     const localData = localStorage.getItem("myPosts");
//     if (localData) {
//       setRespon(JSON.parse(localData));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("myPosts", JSON.stringify(respon));
//   }, [respon]);

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const hideModal = () => {
//     setIsModalOpen(false);
//   };

//   const submit = async () => {
//     try {
//       let values = await form.validateFields();
//       setRespon((prevRespon) => [...prevRespon, { ...values, id: Date.now() }]);
//       form.resetFields();
//       hideModal();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const addTeacher = () => {
//     showModal();
//     setSelected(null);
//   };

//   const searchPosts = () => {
//     const filteredRespon = respon.filter((post) =>
//       post.description.includes(search)
//     );
//     return filteredRespon;
//   };

//   const deleteTeacher = (id) => {
//     setRespon((prevRespon) => prevRespon.filter((post) => post.id !== id));
//   };


//   const editTeacher = (id) => {
//     const postToEdit = respon.find((post) => post.id === id);
//     if (postToEdit) {
//       form.setFieldsValue(postToEdit);
//       setSelected(id);
//       showModal();
//     }
//   };
  
//   const submitEdit = async () => {
//     try {
//       let values = await form.validateFields();
     
//       const postIndex = respon.findIndex((post) => post.id === selected);
//       if (postIndex !== -1) {
//         setRespon((prevRespon) => {
//           const updatedRespon = [...prevRespon];
//           updatedRespon[postIndex] = { ...values, id: selected };
//           return updatedRespon;
//         });
//       }
//       form.resetFields();
//       hideModal();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <section id="slider">
//       <div className="container">
//         <div className="slider-paragraph my-3">
//           <h2>My posts</h2>
//         </div>
//         <div className="search-my-post d-flex my-4">
//           <Input
//             onChange={(e) => setSearch(e.target.value)}
//             value={search}
//             placeholder="serach"
//           />
//           <Button
//             className=" btn-succes"
//             style={{ width: "120px", height: "60px" }}
//             onClick={addTeacher}
//             type="primary"
//           >
//             Add Post
//           </Button>
//         </div>
//         <Modal
//           title="Adding"
//           open={isModalOpen}
//           onOk={selected ? submitEdit : submit}
//           okText={selected ? "Save" : "Add"}
//           onCancel={hideModal}
//         >
//           <Form
//             initialValues={{
//               isMarried: false,
//             }}
//             form={form}
//             layout="vertical"
//             autoComplete="off"
//           >
//             <Form.Item
//               name="title"
//               label="title"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please fill this field!",
//                 },
//               ]}
//             >
//               <Input type="text" />
//             </Form.Item>

//             <Form.Item
//               name="Tags"
//               label="Tags"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please fill this field!",
//                 },
//               ]}
//             >
//               <Input type="text" />
//             </Form.Item>
//             <Form.Item
//               name="category"
//               label="category"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please fill this field!",
//                 },
//               ]}
//             >
//               <Input type="text" />
//             </Form.Item>

//             <Form.Item
//               name="id"
//               label="id"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please fill this field!",
//                 },
//               ]}
//             >
//               <Input type="text" />
//             </Form.Item>

//             <Form.Item
//               rules={[
//                 {
//                   required: true,
//                   message: "Please fill this field!",
//                 },
//                 { type: "", warningOnly: true },
//                 { type: "string", min: 6 },
//               ]}
//               name="image"
//               label="Image"
//             >
//               <Input  />
//             </Form.Item>

//             <Form.Item label="Description" name="description">
//               <TextArea rows={4} />
//             </Form.Item>
//           </Form>
//         </Modal>
//         <div className="owl-carousel">
//           <div className="boxs">
//             <div className="container posts_row my-4">
//               {searchPosts().map((res, index) => (
//                 <div key={index}>
//                   <div className="box">
//                     <div className="box-left">
//                       <Image src={res.image} />
//                     </div>
//                     <div className="box-right">
//                       <h2 className="p-2  ">Title: {res.title}</h2>
//                       <p> Tagas:{res.Tags}</p>
//                       <span>{res.category}</span> <span>id:{res.id}</span>
//                       <p className="p-2">{res.description}</p>
//                       <div className="action-btns d-flex gap-3">
//                         <Button
//                           onClick={() => editTeacher(res.id)}
//                           type="primary"
//                           icon={<EditOutlined />}
//                         />
//                         <Button
//                           onClick={() => deleteTeacher(res.id)}
//                           type="primary"
//                           danger
//                           icon={<DeleteOutlined />}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MyPostsP;


import { useCallback, useEffect, useState } from "react";
import { Button, Form, Input, Modal, Table, Select } from "antd";
import { request } from "../../server/request";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { format } from "date-fns";
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
      // Set the "photo" field to the URL value

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
  // function deleteTeacher(id) {
  //   confirm({
  //     title: "Do you Want to delete this teacher?",
  //     onOk: async () => {
  //       await request.delete(`teacher/${id}`);
  //       getPost();
  //     },
  //   });
  // }

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
                  <h1
                    style={{ marginTop: "100px" }}
                    className="h1 text-center"
                    id="pageHeaderTitle"
                  >
                    My Cards Dark
                  </h1>
                  {mypost.map((pr, index) => (
                    <div key={index} className="postcard dark blue">
                      <a className="postcard__img_link" href="#">
                        <img
                          className="postcard__img"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsVeDqqNBxYldoP9rHXJuGmtvKMP8OoI1sKG4-wX5eKQ&s"
                          alt="Image Title"
                        />
                      </a>
                      <div className="postcard__text">
                        <h1 className="postcard__title blue">
                          <p>{pr.title}</p>
                        </h1>
                        <div className="postcard__subtitle small">
                          <time>
                            {/* <CalendarMonthIcon style={{ marginRight: "5px" }} /> */}
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
              : provinceData[0], // Set a default value from provinceData
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
