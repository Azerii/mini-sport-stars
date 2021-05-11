import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { chevronDown } from "../assets";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  border-radius: 1.2rem;
  padding: 0 2.4rem;
  height: 5.6rem;
  border: 1px solid #efefef;
  position: relative;

  input,
  textarea,
  select {
    display: block;
    color: #1a1a1a;
    width: 100%;
    background-color: transparent;
    border: none;
    font-family: Gordita;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0px;
  }

  select {
    cursor: pointer;
    color: #8d9091;
  }

  .toggleShowText {
    display: none;
  }

  &.password {
    input,
    textarea {
      width: 80%;
    }

    .toggleShowText {
      display: block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 2.4rem;
      cursor: pointer;
      color: #8d9091;
      font-family: Gordita;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 21px;
      letter-spacing: 0px;
    }
  }

  textarea {
    height: 14.4rem;
  }

  label {
    display: block;
    color: #8d9091;
  }

  .dropdownIcon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 2.4rem;
    pointer-events: none;
  }
`;

const handleToggleShow = (e, id) => {
  const toggler = e.target;
  const field = document.querySelector(`#${id}`);

  if (field.type === "password") {
    field.type = "text";
    toggler.innerText = "Hide";
  } else {
    field.type = "password";
    toggler.innerText = "Show";
  }
};

const FormGroup = ({
  className,
  fieldStyle,
  inputType,
  name,
  placeholder,
  required = true,
  options = [],
  defaultValue,
}) => {
  const [showLabel, setShowLabel] = useState(false);

  const toggleLabel = (e) => {
    if (e.target.value.length > 0) {
      setShowLabel(true);
    } else {
      setShowLabel(false);
    }
  };

  useEffect(() => {
    if (defaultValue) {
      setShowLabel(true);
    }
  }, [defaultValue]);

  return (
    <Wrapper className={className} fieldStyle={fieldStyle}>
      {fieldStyle === "shortText" && (
        <>
          <input
            className="textSmall"
            type={inputType}
            id={name}
            name={name}
            placeholder={placeholder}
            onBlur={toggleLabel}
            onChange={toggleLabel}
            required={required || false}
            defaultValue={defaultValue}
          />
          {showLabel && <label htmlFor={name}>{placeholder}</label>}
          {inputType === "password" && (
            <span
              className="toggleShowText"
              onClick={(e) => handleToggleShow(e, name)}
            >
              Show
            </span>
          )}
        </>
      )}
      {fieldStyle === "longText" && (
        <>
          <textarea
            className="textSmall"
            id={name}
            name={name}
            placeholder={placeholder}
            required={required || false}
            defaultValue={defaultValue}
          />
          {showLabel && <label htmlFor={name}>{placeholder}</label>}
        </>
      )}

      {fieldStyle === "dropdown" && (
        <>
          <select
            className="textSmall"
            type={inputType}
            id={name}
            name={name}
            placeholder={placeholder}
            onBlur={toggleLabel}
            onChange={toggleLabel}
            required={required || false}
            defaultValue={defaultValue}
          >
            <option value="" hidden>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {showLabel && <label htmlFor={name}>{placeholder}</label>}
          <img src={chevronDown} alt="dropdown" className="dropdownIcon" />
        </>
      )}
    </Wrapper>
  );
};

FormGroup.propTypes = {
  className: PropTypes.string,
  fieldStyle: PropTypes.string.isRequired,
  inputType: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  options: PropTypes.array,
};

export default FormGroup;
