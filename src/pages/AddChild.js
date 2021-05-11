import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { plus } from "../assets";
import AlertBox from "../components/AlertBox";
import AuthWrapper from "../components/AuthWrapper";
import Button from "../components/Button";
import Caption from "../components/Caption";
import FormGroup from "../components/FormGroup";
import Logo from "../components/Logo";
import Spacer from "../components/Spacer";
import { addChildren } from "../redux/actions";
import { formDataToJSON } from "../utils";

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

const AddChild = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [addMore, setAddMore] = useState(false);
  const children = [];

  const handleSubmit = async (e) => {
    let formEl;
    if (e) {
      e.preventDefault();
      formEl = e.target;
    } else {
      formEl = document.querySelector("#addChildForm");
    }

    const formData = new FormData(formEl);
    const data_JSON = formDataToJSON(formData);

    children.push(data_JSON);

    setLoading(true);

    let res = await addChildren({ children });

    if (res && res.status === "success") {
      setLoading(false);
      document.querySelector(".alertBox").classList.add("show");
      if (addMore) {
        setTimeout(() => {
          document.querySelector(".alertBox").classList.remove("show");
          window.location.reload();
        }, 3000);
      } else {
        setTimeout(() => {
          document.querySelector(".alertBox").classList.remove("show");
          history.push("/terms-and-conditions");
        }, 3000);
      }
    } else if (res && res.status === "error") {
      setLoading(false);
      alert(res.message);
    } else {
      setLoading(false);
      alert("Something went wrong");
    }
  };

  const addAnotherChild = () => {
    setAddMore(true);
  };

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
      <form id="addChildForm" onSubmit={handleSubmit}>
        <FormGroup
          fieldStyle="shortText"
          inputType="text"
          name="name"
          placeholder="Child name"
        />
        <Spacer y={2.4} />
        <FormGroup
          fieldStyle="shortText"
          inputType="number"
          name="age"
          placeholder="Child age"
        />
        {/* <FormGroup
          fieldStyle="dropdown"
          name="age"
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
        /> */}
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
        <AddAnother type="submit" onClick={addAnotherChild}>
          <img src={plus} alt="Plus" className="plusIcon" />
          <Spacer x={1.2} />
          <span>Add another child</span>
        </AddAnother>
        <Spacer y={4.8} />
        <Button
          type="submit"
          text={loading ? "..." : "Finish"}
          fullWidth
          disabled={loading}
        />
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
