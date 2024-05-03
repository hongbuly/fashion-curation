import styled from "styled-components";
import { IMenu } from "../App";

const Wrapper = styled.div<{ selected: boolean }>`
  display: inline-block;
  width: auto;
  height: 30px;
  border-bottom: ${(props) =>
    props.selected ? "3px solid black" : "1px solid grey"};
  background: #fff;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  margin-left: 10%;
  margin-right: 10%;
  font-size: 15px;
`;

const Menu: React.FC<IMenu> = ({ title, selected, onClick }) => {
  return (
    <Wrapper onClick={onClick} selected={selected}>
      {title}
    </Wrapper>
  );
};

export default Menu;
