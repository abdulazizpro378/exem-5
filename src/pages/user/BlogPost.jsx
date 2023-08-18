import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Button, Input } from "antd";
import { IMG_URL } from "../../const";
import {  useParams } from "react-router-dom";

const BlogPost = () => {
    const { id } = useParams();
    // const [post, setPost] = useState({});
  
    // useEffect(() => {
    //   async function getPostById() {
    //     try {
    //       const { data } = await request.get(`post/${id}`);
    //       setPost(data);
    //     } catch (err) {
    //       console.log(err.response);
    //     }
    //   }
    //   getPostById();
    // }, [id]);
  const [search, setSearch] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
//   const albumId = JSON.parse(localStorage.getItem("ID"));
  const getTeachers = useCallback(async () => {
    try {
      let { data } = await axios.get(
        `https://blog-backend-production-a0a8.up.railway.app/api/v1/post?category=${id}`
        // { params: { 'title': search } }
      );
      let categordata = data.data;
      console.log(categordata);
      setTeachers(categordata);
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    getTeachers();
  }, [getTeachers]);
  // console.log(teachers);
  const filteredTeachers = teachers.filter(
    (pr) =>
      pr.category &&
      pr.category.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredTeachers.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);
//   function StudentCategory(id) {
//     localStorage.setItem("ID", JSON.stringify(id));
//   }

  return (
    <div>
      <div className="sliderparagraph">
        {currentPosts.length > 0 && (
          <div className="slidertitle">
            <h1>{currentPosts[0].category.name}</h1>
            <p>{currentPosts[0].category.description}</p>
            <h5>Blog {currentPosts[0].category.name}</h5>
          </div>
        )}
      </div>
      <div id="sliderinput" className="container">
        <Input
          style={{ height: "50px" }}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search..."
        />
      </div>
      <section id="slider">
        <div className="container">
          <div className="owl-carousel">
            {currentPosts.map((pr, index) => (
              <div key={index} className="boxs">
                {/* <NavLink
                  to={`/blogpost`}
                  onClick={() => StudentCategory(pr._id)}
                  className="boxstitle"
                > */}
                  <div className="boxcars">
                    <div className="box-left">
                      {pr.photo ? (
                        <img
                          src={`${IMG_URL}${pr.photo._id}.${
                            pr.photo.name.split(".")[1]
                          }`}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://picsum.photos/1000/1000";
                          }}
                          width='330px'
                        />
                      ) : (
                        <div>No Image Available</div>
                      )}
                    </div>
                    <div className="box-right">
                      <h5 className="nameca">{pr.category.name}</h5>
                      <h3 className="nameca">
                        {pr.user.first_name} Design tips for designers that
                        cover <br />
                        everything you need
                      </h3>
                      <p className="descriptions nameca">
                        {pr.category.description}
                      </p>
                    </div>
                  </div>
                {/* </NavLink> */}
              </div>
            ))}
          </div>
          <div className="pagination">
            <Button disabled={currentPage === 1} onClick={prevPage}>
              Prev
            </Button>
            {Array.from(
              { length: Math.ceil(filteredTeachers.length / postsPerPage) },
              (_, i) => (
                <Button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={currentPage === i + 1 ? "active" : ""}
                >
                  {i + 1}
                </Button>
              )
            )}
            <Button
              disabled={
                currentPage ===
                Math.ceil(filteredTeachers.length / postsPerPage)
              }
              onClick={nextPage}
            >
              Next
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
