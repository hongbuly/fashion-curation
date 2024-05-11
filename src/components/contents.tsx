import styled from "styled-components";
import Style1Contents from "./style1_contents";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./../firebase";
import { useState } from "react";

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
  const [size, setSize] = useState(0);
  const [message, setMessage] = useState(
    "아직 작성중입니다. 이메일 구독을 하여 제일 먼저 글을 읽어보세요."
  );

  const fetchContents = async () => {
    try {
      const menusQuery = query(collection(db, title));
      const snapshot = await getDocs(menusQuery);
      const size = snapshot.size;
      setSize(size);
    } catch (e) {
      setMessage("파이어베이스 사용 가능량을 초과하였습니다.");
    }
  };

  fetchContents();

  if (size != 0) {
    const style1ContentsArray = Array.from({ length: size }, (_, index) => (
      <Style1Contents key={index} title={title} index={index + 1} />
    ));
    return <Wrapper>{style1ContentsArray}</Wrapper>;
  } else
    return (
      <Wrapper>
        <Text>{message}</Text>
      </Wrapper>
    );
}
