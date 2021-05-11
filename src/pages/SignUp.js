import { useState } from "react";
import { useHistory } from "react-router";
import AuthWrapper from "../components/AuthWrapper";
import Button from "../components/Button";
import Caption from "../components/Caption";
import FormGroup from "../components/FormGroup";
import Logo from "../components/Logo";
import PromptText from "../components/PromptText";
import Spacer from "../components/Spacer";
import { registerUser } from "../redux/actions";
import { formDataToJSON } from "../utils";

const SignUp = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data_JSON = formDataToJSON(formData);

    setLoading(true);

    let res = await registerUser(data_JSON);

    if (res && res.status === "success") {
      setLoading(false);
      history.push("/sign-in");
      console.log(res);
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
        heading={`Welcome to Mini Sport Stars`}
        subHeading={`Mini Sport Stars is a charter standard football club`}
        align="center"
      />
      <Spacer y={4.2} />
      <form onSubmit={handleSubmit}>
        <FormGroup
          fieldStyle="shortText"
          inputType="text"
          name="full_name"
          placeholder="Full name"
        />
        <Spacer y={2.4} />
        <FormGroup
          fieldStyle="shortText"
          inputType="email"
          name="email"
          placeholder="Email address"
        />
        <Spacer y={2.4} />
        <FormGroup
          fieldStyle="shortText"
          inputType="number"
          name="phone_number"
          placeholder="Phone number"
        />
        <Spacer y={2.4} />
        <FormGroup
          fieldStyle="shortText"
          inputType="text"
          name="address"
          placeholder="Address"
        />
        <Spacer y={2.4} />
        <FormGroup
          className="password"
          fieldStyle="shortText"
          inputType="password"
          name="password"
          placeholder="Password"
        />
        <Spacer y={2.4} />
        <FormGroup
          className="password"
          fieldStyle="shortText"
          inputType="password"
          name="confirmation_password"
          placeholder="Confirm Password"
        />
        <Spacer y={4.8} />
        <Button
          text={loading ? "..." : "Register"}
          disabled={loading}
          fullWidth
        />
        <Spacer y={2.4} />
        <PromptText
          prompt={`Already have an account?`}
          linkText={`Sign in`}
          href="/sign-in"
        />
        <Spacer y={4.8} />
      </form>
    </AuthWrapper>
  );
};

export default SignUp;
