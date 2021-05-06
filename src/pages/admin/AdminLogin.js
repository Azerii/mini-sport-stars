import styled from "styled-components";
import Logo from "../../components/Logo";
import Button from "../../components/Button";
import FormGroup from "../../components/FormGroup";
import Spacer from "../../components/Spacer";
import { useHistory } from "react-router";

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
  const handleSubmit = (e) => {
    e.preventDefault();

    history.push("/admin/dashboard");
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
            name="email_address"
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
          <Button text="Sign in" fullWidth />
          <Spacer y={4.8} />
        </form>
      </Wrapper>
    </>
  );
};

export default AdminLogin;
