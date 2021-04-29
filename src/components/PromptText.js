import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  font-size: 14px;
  text-align: ${(props) => props.align ?? "center"};

  .prompt {
    color: #1a1a1a;
  }

  .link {
    color: #cd2853;
    font-weight: 500;
  }
`;

const PromptText = ({ prompt, linkText, href, align }) => {
  return (
    <Wrapper {...align}>
      {prompt && <span className="prompt">{prompt}</span>}{" "}
      {linkText && (
        <a href={href} className="link">
          {linkText}
        </a>
      )}
    </Wrapper>
  );
};

PromptText.propTypes = {
  prompt: PropTypes.string,
  linkText: PropTypes.string,
  href: PropTypes.string,
  align: PropTypes.string,
};

export default PromptText;
