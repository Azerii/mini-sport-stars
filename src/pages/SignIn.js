import AuthWrapper from "../components/AuthWrapper";
import Button from "../components/Button";
import Caption from "../components/Caption";
import FormGroup from "../components/FormGroup";
import Logo from "../components/Logo";
import PromptText from "../components/PromptText";
import Spacer from "../components/Spacer";

const SignIn = () => {
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
      <form>
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
