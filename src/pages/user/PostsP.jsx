import { Image, Input, Pagination } from "antd";
import { Fragment, useCallback, useEffect, useState } from "react";
import { IMG_URL } from "../../const";


// import { request } from "../../../server/request";

import { request } from "../../server/request";
const PostsP = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(1);
  const { Search } = Input;
  const LIMIT = 10;



  const onChange = (page) => {
    setPage(page);
  };

  const getPosts = useCallback(async () => {
    try {
      let { data } = await request.get(
        `post?page=${page}&limit=${LIMIT}&search=${search}`
      );
      setPosts(data.data);

      setTotal(data.pagination.total);
    } catch (err) {
      console.log(err);
    }
  }, [page, search]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      <section id="all_posts" className="all_posts">
        <div className="container">
          <div className="search_wrapper" style={{ margin: "40px 0" }}>
            <Search
              placeholder="input search text"
              enterButton="Search"
              size="large"
            
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="posts_title">
            <h1>All posts</h1>
            <div className="line"></div>
          </div>
        </div>
      </section>
      <section className="all_cards">
        <div className="container posts_row">
          {posts.map((res) => (
            <div key={res._id}>
              <div className="box">
                <div className="box-left">
                <Image
                  src={
                    IMG_URL + res.photo._id + "." + res.photo.name.split(".")[1]
                  }
                  alt="Photo"
                />
                </div>
                <div className="box-right">
                  <p className="p-4">{res.category.name}</p>
                  <h3>{res.title}</h3>
                  <span>{res.updatedAt.split("T")[0]}</span>
                  <p className="p-5">{res.description}</p>
                </div>
              </div>
            </div>
          ))}
          <Pagination current={page} onChange={onChange} total={total} />
        </div>
      </section>
    </Fragment>
  );
};

export default PostsP;
