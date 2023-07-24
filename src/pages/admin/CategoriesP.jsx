import { Image, Input, Pagination, Spin } from "antd";
// import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { request } from "../../server/request";

const CategoryP = () => {
  const { id } = useParams();
  const [categorys, setCategorys] = useState([]);

  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(1);

  const { Search } = Input;

  const LIMIT = 10;

  console.log(id);

  const onChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    async function getCategory() {
      try {
        let { data } = await request.get(
          `post?page=${page}&limit=${LIMIT}&category=${id}&search=${search}`
        );

        setCategorys(data.data);
        setTotal(data.pagination.total);
      } catch (err) {
        console.log(err.response);
      }
    }
    getCategory();
  }, [page, id, search]);
  // console.log(categorys);


  

  if (!categorys) {
    return (
      <div>
        <Spin
          size="large"
          style={{
            fontSize: "50px",
            color: "blue",
            fontWeight: "bold",
          }}
        />
      </div>
    );
  }
console.log(categorys);

  return (
    <div className="container my-3 ">
      <div className="start-tup">


        {categorys.slice(0,1).map((res) => (
        <div key={res._id}>
    
          
            <div className="box-right">
              <h1 className="p-4">{res.category.name}</h1>
              <h3>{res.title}</h3>
              <p className="p-5">{res.description}</p>
            
          </div>
        </div>
      ))}
      </div>
      {/* Boshqa kategoriya ma'lumotlari bilan ishlay olasiz */}

      <div className="search_wrapper" style={{ margin: "40px 0" }}>
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {categorys.map((res) => (
        <div key={res._id}>
          <div className="box">
            <div className="box-left">
              <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
            </div>
            <div className="box-right">
              <p className="p-4">{res.user.first_name}</p>
              <h3>{res.title}</h3>
              <span>{res.updatedAt.split("T")[0]}</span>
              <p className="p-5">{res.description}</p>
            </div>
          </div>
        </div>
      ))}
      <Pagination
        style={{ margin: "20px" }}
        current={page}
        onChange={onChange}
        total={total}
      />
    </div>
  );
};

export default CategoryP;
