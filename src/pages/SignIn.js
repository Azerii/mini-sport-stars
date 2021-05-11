import { useState } from "react";
import { useHistory } from "react-router";
import AuthWrapper from "../components/AuthWrapper";
import Button from "../components/Button";
import Caption from "../components/Caption";
import FormGroup from "../components/FormGroup";
import Logo from "../components/Logo";
import PromptText from "../components/PromptText";
import Spacer from "../components/Spacer";
import { loginUser } from "../redux/actions";
import { formDataToJSON } from "../utils";

const SignIn = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data_JSON = formDataToJSON(formData);

    setLoading(true);

    let res = await loginUser(data_JSON);

    if (res && res.status === "success") {
      setLoading(false);
      history.push("/");
    } else if (res && res.status === "error") {
      setLoading(false);
      alert(res.message);
    } else {
      setLoading(false);
      alert("Something went wrong");
    }
  };
  return (
    <AuthWrapper>
      <Spacer y={4.8} />
      <Logo />
      <Spacer y={4.8} />
      <Caption
        heading={`Welcome back`}
        subHeading={`Enter your email address and password below to login.`}
        align="center"
      />
      <Spacer y={4.2} />
      <form onSubmit={handleSubmit}>
        <FormGroup
          fieldStyle="shortText"
          inputType="email"
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
        <Spacer y={2.4} />
        <PromptText
          prompt={`Not registered yet?`}
          linkText={`Sign up`}
          href="/sign-up"
        />
        <Spacer y={1.2} />
        <PromptText
          prompt={`Forgot password?`}
          linkText={`Retrieve it here`}
          href="/forgot-password"
        />
        <Spacer y={4.8} />
      </form>
    </AuthWrapper>
  );
};

export default SignIn;
