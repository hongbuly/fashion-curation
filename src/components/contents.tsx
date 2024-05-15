import styled from "styled-components";
import Style1Contents from "./style1_contents";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "./../firebase";
import { useEffect, useState } from "react";

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
  margin-top: 100px;
  margin-bottom: 50px;
`;

export default function Contents({ title }: { title: string }) {
  const [contents, setContents] = useState<string[]>([]);

  const fetchContents = async () => {
    try {
      const menusQuery = query(collection(db, title));
      const snapshot = await getDocs(menusQuery);
      const size = snapshot.size;

      const temp: string[] = [];
      for (let i = 1; i <= size; i++) {
        const contentsQuery = doc(db, title, i.toString());
        const snapshot = await getDoc(contentsQuery);
        if (snapshot.exists()) {
          const { contents } = snapshot.data();
          temp.push(contents);
        }
      }
      console.log(title);
      console.log(temp);
      setContents(temp.length > 0 ? temp : []);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchContents();
  }, [title]);

  return (
    <Wrapper>
      {contents.length !== 0 ? (
        contents.map((content, index) => (
          <Style1Contents
            key={index}
            title={title}
            index={index + 1}
            content={content}
          />
        ))
      ) : (
        <Text>
          아직 작성중입니다. 이메일 구독을 하여 제일 먼저 글을 읽어보세요.
        </Text>
      )}
    </Wrapper>
  );
}
