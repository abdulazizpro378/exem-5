import { Image, Spin } from "antd";
import { Fragment, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { IMG_URL } from "../../const";
import { request } from "../../server/request";

const HomeP = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [catigory, setCatigory] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [isLoadingCatigory, setIsLoadingCatigory] = useState(true);

  useEffect(() => {
    async function getPosts() {
      try {
        let { data } = await request.get("post/lastones");
        setPosts(data);
      } catch (err) {
        console.log(err.response);
      } finally {
        setIsLoadingPosts(false); // Postlar yuklandi
      }
    }
    getPosts();
  }, []);

  // console.log(posts);

  useEffect(() => {
    async function getPosts() {
      try {
        let { data } = await request.get("category");
        const category1 = data.data;

        setCatigory(category1);
      } catch (err) {
        console.log(err.response);
      } finally {
        setIsLoadingCatigory(false); // Kategoriyalar yuklandi
      }
    }
    getPosts();
  }, []);

  console.log(catigory);

  // console.log(posts);

  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  var settings1 = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const getCategoryId = (categoryId) => {
    setCatigory(categoryId);
    navigate(`/blogpost/${categoryId}`);
  };

  const getPosts = (postsId) => {
    setPosts(postsId);
    navigate(`/posts/${postsId}`);
  };

  return (
    <Fragment>
      <section id="home">
        <div>
          {isLoadingPosts || isLoadingCatigory ? (
            <div className="example">
              <Spin size="large" />
            </div>
          ) : (
            <>
              <Slider {...settings1} className="container">
                {posts.map((pr) => (
                  <div key={pr}>
                    <div className="home-container">
                      <h4>{pr.title}</h4>
                      <h1>Step-by-step guide to choosing great font pairs</h1>
                      <h5>
                        By <span> {pr.title}</span> |{" "}
                        {pr.updatedAt.split("T")[0]}
                      </h5>
                      <p>{pr.description}</p>

                      <div className="btn">
                        <button>Read Mor </button>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </>
          )}
        </div>
      </section>
      <div className="carucel container">
        <h1 className="popular"> Popular blogs </h1>

        <Slider {...settings}>
          {posts.map((pr) => (
            <div key={pr} onClick={() => getPosts(pr._id)}>
              <Card style={{ width: "18rem" }} className="cart line-clamp">
             
                {pr.photo ? (
                  <Image
                    src={`${IMG_URL}${pr.photo._id}.${
                      pr.photo.name.split(".")[1]
                    }`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://picsum.photos/1000/1000";
                    }}
                    width="220px"
                  />
                ) : (
                  <div>eror image </div>
                )}
                <Card.Body>
                  <p>{pr?.updatedAt.split("T")[0]}</p>
                  
                  <Card.Title>{pr.title ? pr.title : " lorem  der"}</Card.Title>
                  <Card.Text>{pr.description}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Slider>
      </div>

      <section id="contact">
        <div className="container">
          <div className="contact-top">
            <h1>Choose A Catagory</h1>
          </div>

          <div className="contact-row">
            {catigory.slice(0, 4).map((pr, i) => (
              <div key={i}>
                <div
                  className="contact-card"
                  onClick={() => getCategoryId(pr._id)}
                >
                  <div className="card-img">
                    <img
                      src={
                        IMG_URL +
                        pr.photo._id +
                        "." +
                        pr.photo.name.split(".")[1]
                      }
                      alt="Photo"
                    />
                  </div>
                  <h1>{pr.name} </h1>
                  <p>{pr.description} </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default HomeP;
