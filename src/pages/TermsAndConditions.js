import { Redirect, useHistory } from "react-router";
import styled from "styled-components";
import Button from "../components/Button";
import Caption from "../components/Caption";
import CheckBox from "../components/CheckBox";
import Logo from "../components/Logo";
import Spacer from "../components/Spacer";
import { store } from "../redux/store";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 27rem;

  .prompt,
  .content {
    font-family: Gordita;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media screen and (max-width: 768px) {
    padding: 0 2.4rem;
  }
`;

const TermsAndConditions = () => {
  const history = useHistory();
  const handleContinue = () => {
    const checkbox_one = document.querySelector(`input[name="readAndAgreed"]`);
    const checkbox_two = document.querySelector(`input[name="photoConsent"]`);

    if (checkbox_one.checked && checkbox_two.checked) {
      history.push("/");
    } else {
      alert("Please check both boxes to continue");
    }
  };

  if (store.getState().token) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Wrapper>
      <Spacer y={4.8} />
      <Logo />
      <Spacer y={4.8} />
      <Caption heading={`Terms and Conditions`} align="center" />
      <Spacer y={3.6} />
      <p className="content fullWidth">
        Please note that all bookings are based on a 'First come, first served
        basis. Children will not be able to participate in the course without
        prior payment. Mini Sports Stars and Norbury Manor Primary School or any
        premises providing facilities and their respective agents or staff are
        not liable under any circumstances for personal injury, loss or damage
        during this course. Pictures may be taken for Mini Sports Stars Website
        and other social media platforms.
        <br />
        Please note if you are unable to collect your children on time, then
        please make alternative arrangements for them to be collected. However
        late collections may lead to your children having restricted access to
        future clubs.
      </p>
      <Spacer y={4.8} />
      <div className="flex-row fullWidth">
        <CheckBox id="readAndAgreed" name="readAndAgreed" required />
        <Spacer x={1.2} />
        <span className="prompt">
          I have read and agreed to the above Terms &amp; Conditions
        </span>
      </div>
      <Spacer y={1.2} />
      <div className="flex-row fullWidth">
        <CheckBox id="photoConsent" name="photoConsent" required />
        <Spacer x={1.2} />
        <span className="prompt">
          I give photo consent for Mini Sports Stars social platforms
        </span>
      </div>
      <Spacer y={1.2} />
      <p className="content fullWidth">
        NB: Bookings will not be valid without confirmation of the Terms &
        Conditions
      </p>
      <Spacer y={4.8} />
      <Button text="Continue" width="50%" onClick={handleContinue} />
      <Spacer y={4.8} />
    </Wrapper>
  );
};

export default TermsAndConditions;
