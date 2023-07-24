import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Spin, Form, Input , Button } from "antd";
import { request } from "../../server/request";
import { useNavigate } from "react-router-dom";

const AccountP = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const submit = async (values) => {
    try {
      setLoading(true);
      await request.put("auth/details", values);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="RegisterFlex">
        <section className="loginpage">
          <h1>Account</h1>
          {loading ? (
            <Spin
              size="large"
              style={{
                fontSize: "50px",
                color: "blue",
                fontWeight: "bold",
              }}
            />
          ) : (
            <Form form={form} onFinish={submit}>
              <Form.Item
                name="first_name"
                label="Firstname"
                rules={[{ required: true, message: "Please enter your Firstname" }]}
              >
                <Input  />
              </Form.Item>
              <Form.Item
                name="last_name"
                label="Lastname"

                rules={[{ required: true, message: "Please enter your Lastname" }]}
              >
                <Input  />
              </Form.Item>
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: "Please enter your Username" }]}
              >
                <Input  />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Please enter your Password" }]}
              >
                <Input  />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Save
                </Button>
              </Form.Item>
            </Form>
          )}
        </section>
      </div>
    </section>
  );
};

export default AccountP;
