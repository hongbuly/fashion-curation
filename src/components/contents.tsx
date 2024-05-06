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

const Text = styled.p`
  width: inherit;
  font-family: "Nanum Myeongjo", serif;
  white-space: pre-wrap;
  font-size: 17px;
  margin-bottom: 50px;
`;

export default function Contents({ title }: { title: string }) {
  if (title == "24 ss women")
    return (
      <Wrapper>
        <Style1Contents title={title} index={1} />
        <Style1Contents title={title} index={2} />
        <Style1Contents title={title} index={3} />
      </Wrapper>
    );
  else
    return (
      <Wrapper>
        <Text>
          아직 작성중입니다. 이메일 구독을 하여 제일 먼저 글을 읽어보세요.
        </Text>
      </Wrapper>
    );
}
