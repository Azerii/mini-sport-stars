import styled from "styled-components";
import PropTypes from "prop-types";
import { chevronDown, close, filterIcon } from "../../assets";
import Spacer from "../Spacer";
import { useState } from "react";

const FilterWrapper = styled.ul`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 10;
  margin: 0 1.8rem;
  padding: 1.2rem 0;
  // background-color: #eff0f6;
  border-radius: 2px;

  .linkWrapper {
    margin-right: 4.8rem;
    position: relative;
    cursor: pointer;
    font-family: Gordita;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0px;
    color: #a0a3bd;
  }

  .navLink {
    display: flex;
    align-items: center;
    font-weight: 500;
    white-space: nowrap;

    .icon {
      height: 0.6rem;
      margin-left: 1.6rem;
      filter: brightness(0%) saturate(100%) invert(73%) sepia(5%)
        saturate(1147%) hue-rotate(196deg) brightness(91%) contrast(82%);
    }
  }

  .closeIcon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1.8rem;
    cursor: pointer;
    height: 2.4rem;
    filter: brightness(0%) saturate(100%) invert(73%) sepia(5%) saturate(1147%)
      hue-rotate(196deg) brightness(91%) contrast(82%);
  }
`;

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 2.4rem;
`;

const ToggleBtn = styled.button`
  font-family: Gordita;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  color: #a0a3bd;
  background-color: #eff0f6;
  border: 1px solid #00000000;
  border-radius: 2px;
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  white-space: nowrap;
  transition: all 250ms ease-out;

  &:hover {
    // box-shadow: 0px 0px 12px #00000008;
    border: 1px solid #00000008;
  }

  .icon {
    height: 1.8rem;
    margin-right: 0.8rem;
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 150%;
  left: 0%;
  // transform: translateX(-50%);
  background-color: #ffffff;
  border-radius: 1rem;
  z-index: 10;
  box-shadow: 0px 16px 40px 0px rgba(0, 0, 0, 0.03);
  padding: 1.2rem;
  opacity: 0;
  pointer-events: none;
  transition: all 250ms ease-out;
  min-width: 15vw;

  &.open {
    opacity: 1;
    pointer-events: all;
  }

  .item {
    display: block;
    padding: 1rem;
    border-radius: 2px;

    &:hover {
      background-color: #eff0f6;
    }

    .btn {
      color: #828282;
      white-space: nowrap;

      &.active {
        color: #1c0f61;
      }
    }
  }
`;

const dates = [
  {
    text: "All time",
    func: null,
  },
  {
    text: "Today",
    func: null,
  },
  {
    text: "Yesterday",
    func: null,
  },
  {
    text: "This week",
    func: null,
  },
  {
    text: "This month",
    func: null,
  },
  {
    text: "Last 3 months",
    func: null,
  },
];

const events = [
  "All",
  "1 to 1 Coaching",
  "Advanced Centre",
  "Saturday Morning Football",
  "Half Term",
  "Trial Days",
  "Birthday Parties",
];

const ageGroups = [
  "All",
  "Reception",
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4",
  "Year 5",
  "Year 6",
];

// const hideDropDown = () => {
//   document
//     .querySelectorAll(".dropdown")
//     .forEach((el) => el.classList.remove("open"));
// };

const toggleDropdown = (selector) => {
  const target = document.querySelector(selector);

  document.querySelectorAll(".dropdown").forEach((el) => {
    if (el === target) {
      el.classList.toggle("open");
    } else {
      el.classList.remove("open");
    }
  });

  return null;
};

const Filter = ({ column = {} }) => {
  const [showFilters, setShowFilters] = useState(false);
  const { filterValue, setFilter } = column;
  // const [columnVal, setColumnVal] = useState(filterValue || "");

  const handleSelect = (e, text) => {
    setFilter(text);
    // e.target.classList.add;
  };

  return (
    <>
      <ToggleWrapper>
        <ToggleBtn onClick={() => setShowFilters(!showFilters)}>
          <img src={filterIcon} alt="Filter" className="icon" />
          <span>Filter by</span>
        </ToggleBtn>
      </ToggleWrapper>
      <Spacer y={1.2} />
      {showFilters && (
        <FilterWrapper>
          <li
            className="linkWrapper"
            onClick={() => toggleDropdown(".dropdown__date")}
            // onMouseLeave={hideDropDown}
          >
            <span className="navLink textSmall">
              <span>Date</span>
              <img src={chevronDown} alt="dropdown" className="icon" />
            </span>
            <Dropdown className="dropdown dropdown__date">
              {dates.map((item) => (
                <li key={item.text} className="item">
                  <button
                    className={`btn ${
                      item.text === filterValue ? "active" : "static"
                    }`}
                    onClick={(e) => handleSelect(e, item.text)}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </Dropdown>
          </li>
          <li
            className="linkWrapper"
            onClick={() => toggleDropdown(".dropdown__ageGroup")}
            // onMouseLeave={hideDropDown}
          >
            <span className="navLink textSmall">
              <span>Age group</span>
              <img src={chevronDown} alt="dropdown" className="icon" />
            </span>
            <Dropdown className="dropdown dropdown__ageGroup">
              {ageGroups.map((item) => (
                <li key={item} className="item">
                  <button className="btn">{item}</button>
                </li>
              ))}
            </Dropdown>
          </li>
          <li
            className="linkWrapper"
            onClick={() => toggleDropdown(".dropdown__event")}
            // onMouseLeave={hideDropDown}
          >
            <span className="navLink textSmall">
              <span>Event</span>
              <img src={chevronDown} alt="dropdown" className="icon" />
            </span>
            <Dropdown className="dropdown dropdown__event">
              {events.map((item) => (
                <li key={item} className="item">
                  <button className="btn">{item}</button>
                </li>
              ))}
            </Dropdown>
          </li>
          <img
            src={close}
            alt="close"
            className="closeIcon"
            onClick={() => setShowFilters(!showFilters)}
          />
        </FilterWrapper>
      )}
    </>
  );
};

Filter.propTypes = {
  column: PropTypes.string,
};

export default Filter;
