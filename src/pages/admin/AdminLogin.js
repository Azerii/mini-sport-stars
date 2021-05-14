import styled from "styled-components";
import Logo from "../../components/Logo";
import Button from "../../components/Button";
import FormGroup from "../../components/FormGroup";
import Spacer from "../../components/Spacer";
import { useHistory } from "react-router";
import { formDataToJSON } from "../../utils";
import { useState } from "react";
import { loginAdmin } from "../../redux/actions";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 9.6rem;
`;

const Wrapper = styled.div`
  height: calc(100vh - 9.6rem);
  overflow: auto;
  background-color: #f7f7fc;
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    width: 40%;
    background-color: #ffffff;
    padding: 0 4.8rem;
  }

  .title {
    font-family: Gordita;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px;
    letter-spacing: 0em;
    text-align: center;
    color: #cd2853;
  }
`;

const AdminLogin = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data_JSON = formDataToJSON(formData);

    setLoading(true);

    let res = await loginAdmin(data_JSON);

    if (res && res.status === "success") {
      setLoading(false);
      history.push("/admin");
    } else if (res && res.status === "error") {
      setLoading(false);
      alert(res.message);
    } else {
      setLoading(false);
      alert("Something went wrong");
    }
  };
  return (
    <>
      <Header>
        <Logo />
      </Header>
      <Wrapper>
        <Spacer y={9.6} />
        <form onSubmit={handleSubmit}>
          <Spacer y={4.8} />
          <h2 className="title">Admin Dashboard</h2>
          <Spacer y={4.8} />
          <FormGroup
            fieldStyle="shortText"
            inputType="text"
            name="email"
            placeholder="Email address"
            type="email"
          />
          <Spacer y={2.4} />
          <FormGroup
            className="password"
            fieldStyle="shortText"
            inputType="password"
            name="password"
            placeholder="Password"
          />
          <Spacer y={4.8} />
          <Button
            text={loading ? "..." : "Sign in"}
            disabled={loading}
            fullWidth
          />
          <Spacer y={4.8} />
        </form>
        <Spacer y={9.6} />
      </Wrapper>
    </>
  );
};

export default AdminLogin;
