import AuthWrapper from "../components/AuthWrapper";
import Button from "../components/Button";
import Caption from "../components/Caption";
import FormGroup from "../components/FormGroup";
import Logo from "../components/Logo";
import Spacer from "../components/Spacer";

const ForgotPassword = () => {
  return (
    <AuthWrapper>
      <Spacer y={4.8} />
      <Logo />
      <Spacer y={9.6} />
      <Caption
        heading={`Forgot your password?`}
        subHeading={`Enter the email associated with your account and we’ll\nsend an email with instructions to reset your password.`}
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
        <Spacer y={4.8} />
        <Button text="Reset Password" fullWidth />
        <Spacer y={4.8} />
      </form>
    </AuthWrapper>
  );
};

export default ForgotPassword;
