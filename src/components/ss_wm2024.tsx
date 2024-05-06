import styled from "styled-components";
import Style1Contents from "./style1_contents";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 0px;
  width: 80%;
  @media screen and (max-width: 755px) {
    width: 100%;
  }
`;

export default function SSWM2024({ title }: { title: string }) {
  return (
    <Wrapper>
      <Style1Contents title={title} index={1} />
    </Wrapper>
  );
}
