import AuthWrapper from "../components/AuthWrapper";
import Button from "../components/Button";
import Caption from "../components/Caption";
import FormGroup from "../components/FormGroup";
import Logo from "../components/Logo";
import PromptText from "../components/PromptText";
import Spacer from "../components/Spacer";

const SignUp = () => {
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
      <form>
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
          name="email_address"
          placeholder="Email address"
        />
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
          name="confirm_password"
          placeholder="Confirm Password"
        />
        <Spacer y={4.8} />
        <Button text="Register" fullWidth />
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
