import { Image } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_URL } from "../../const";
// import { IMG_URL } from "../../const";
import { request } from "../../server/request";

const PostP = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    async function getPostById() {
      try {
        const { data } = await request.get(`post/${id}`);
        setPost(data);
      } catch (err) {
        console.log(err.response);
      }
    }
    getPostById();
  }, [id]);



  return (
    <Fragment>
      <section>
        <div className="container">
          <div className="div-row">
            <div className="img-post">
              {/* {console.log(post.photo._id)} */}
              {/* <Image className="img4" style={{height:'600px', width:'100%'}} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" /> */}
              {/* <Image
                  src={
                    IMG_URL + post.photo._id + "." + post.photo.name.split(".")[1]
                  }
                  alt="Photo"
                /> */}
                  {post.photo ? (
                  <Image
                    src={`${IMG_URL}${post.photo._id}.${
                      post.photo.name.split(".")[1]
                    }`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://picsum.photos/1000/1000";
                    }}
                    style={{height:'600px', width:'100%'}}
                  />
                ) : (
                  <div>eror image </div>
                )}
            </div>
            <h1>{post.title} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, molestiae!</h1>
            {/* <p>Startup (#business, #screen, #life):  {post.updatedAt.split("T")[0]}</p> */}
            <p>{post.description}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quis accusantium totam distinctio iure, dolor quidem accusamus aliquid quaerat autem porro voluptatibus, error consequuntur! Ducimus pariatur recusandae asperiores sequi cupiditate.
            
            </p>
            
           
          </div>
        
        </div>
      </section>
    </Fragment>
  );
};

export default PostP;
