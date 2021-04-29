import styled from "styled-components";
import { plus } from "../assets";
import AlertBox from "../components/AlertBox";
import AuthWrapper from "../components/AuthWrapper";
import Button from "../components/Button";
import Caption from "../components/Caption";
import FormGroup from "../components/FormGroup";
import Logo from "../components/Logo";
import Spacer from "../components/Spacer";

const AddAnother = styled.button`
  display: flex;
  align-items: center;
  width: fit-content;
  font-family: Gordita;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;

  .plusIcon {
    height: 2.4rem;
  }
`;

const addAnotherChild = (e) => {
  e.preventDefault();

  document.querySelector(".alertBox").classList.add("show");
  setTimeout(
    () => document.querySelector(".alertBox").classList.remove("show"),
    3000
  );
};

const AddChild = () => {
  return (
    <AuthWrapper>
      <AlertBox className="alertBox" text="Child saved successfully" />
      <Spacer y={4.8} />
      <Logo />
      <Spacer y={4.8} />
      <Caption
        heading={`Add Child`}
        subHeading={`Fill in the details below to register your child`}
        align="center"
      />
      <Spacer y={4.2} />
      <form>
        <FormGroup
          fieldStyle="shortText"
          inputType="text"
          name="child_name"
          placeholder="Child name"
        />
        <Spacer y={2.4} />
        <FormGroup
          fieldStyle="dropdown"
          name="child_age"
          placeholder="Child age"
          options={[
            "1yr",
            "2yrs",
            "3yrs",
            "4yrs",
            "5yrs",
            "6yrs",
            "7yrs",
            "8yrs",
            "9yrs",
            "10yrs",
            "11yrs",
            "12yrs",
            "13yrs",
            "14yrs",
            "15yrs",
            "16yrs",
            "17yrs",
          ]}
        />
        <Spacer y={2.4} />
        <FormGroup
          fieldStyle="dropdown"
          name="age_group"
          placeholder="Age group"
          options={[
            "Reception",
            "Year 1",
            "Year 2",
            "Year 3",
            "Year 4",
            "Year 5",
            "Year 6",
          ]}
        />
        <Spacer y={2.4} />
        <FormGroup
          fieldStyle="dropdown"
          name="gender"
          placeholder="Gender"
          options={["Male", "Female"]}
        />
        <Spacer y={2.4} />
        <AddAnother onClick={addAnotherChild}>
          <img src={plus} alt="Plus" className="plusIcon" />
          <Spacer x={1.2} />
          <span>Add another child</span>
        </AddAnother>
        <Spacer y={4.8} />
        <Button text="Finish" fullWidth disabled />
        <Spacer y={2.4} />
        <a href="/terms-and-conditions" className="skip textUnderline">
          Skip
        </a>
        <Spacer y={4.8} />
      </form>
    </AuthWrapper>
  );
};

export default AddChild;
