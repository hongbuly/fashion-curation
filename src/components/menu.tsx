import styled from "styled-components";
import { IMenu } from "../App";

const Wrapper = styled.div`
  display: inline-block;
  width: auto;
  height: 30px;
  border-bottom: 1px solid black;
  background: #fff;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  margin-left: 100px;
  margin-right: 100px;
`;

export default function Menu({ title }: IMenu) {
  return <Wrapper>{title}</Wrapper>;
}
