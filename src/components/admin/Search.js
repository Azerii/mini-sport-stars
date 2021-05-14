import styled from "styled-components";
import PropTypes from "prop-types";
import { searchIcon } from "../../assets";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 2.4rem;
  background-color: #eff0f6;
  border-radius: 2px;
  width: 33%;

  .searchIcon {
    height: 2.4rem;
    margin-right: 1.8rem;
  }

  input {
    display: inline-block;
    color: #828282;
    width: 100%;
    background-color: transparent;
    border: none;
    font-family: Gordita;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0px;

    &::placeholder {
      font-family: Gordita Regular;
      color: #a0a3bd;
    }
  }
`;

const Search = ({ filter = "", setFilter }) => {
  return (
    <Wrapper>
      <img src={searchIcon} alt="search" className="searchIcon" />
      <input
        type="text"
        name="search"
        placeholder="Type to enter search"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      />
    </Wrapper>
  );
};

Search.propTypes = {
  searchVal: PropTypes.string,
  setSearchVal: PropTypes.func,
};

export default Search;
