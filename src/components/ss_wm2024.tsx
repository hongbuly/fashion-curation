import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 0px;
  width: 80%;
  background-color: grey;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
`;

const ImageComment = styled.p`
  font-size: 10px;
`;

const Text = styled.p`
  width: inherit;
  font-family: "Nanum Myeongjo", serif;
  white-space: pre-wrap;
  font-size: 10px;
`;

export default function SSWM2024() {
  return (
    <Wrapper>
      <Box>
        <ImageBox>
          <Image src="https://firebasestorage.googleapis.com/v0/b/fashion-curation.appspot.com/o/ss_wm2024%2Flook01-driesvannoten.png?alt=media&token=6c60dd22-56c3-4149-8aa3-2042149f0092" />
          <ImageComment>24 ss women - dries van noten</ImageComment>
        </ImageBox>
        <ImageBox>
          <Image src="https://firebasestorage.googleapis.com/v0/b/fashion-curation.appspot.com/o/ss_wm2024%2Flook02-dior.png?alt=media&token=27e511ef-cbb0-4c58-b869-3a98d7895f7d" />
          <ImageComment>24 ss women - dior</ImageComment>
        </ImageBox>
        <TextBox>
          <Text>
            {" "}
            이번 컬렉션에서는 허리선을 강조한 트렌치코트가 많이 보였다. 허리에
            라인이 들어가거나, 벨트로 허리선을 강조하면, 여성스럽고 다리가 더
            길어보여 비율이 좋아보인다.{" "}
          </Text>{" "}
          <br />
          <Text>
            {" "}
            또한 기존의 트렌치코트라면 떠올릴 베이지색보다 어두운 네이비나 블랙
            컬러들이 선보였다. 어두운 컬러로 시크한 느낌이 더 느껴진다.{" "}
          </Text>
          <br />
          <Text>
            {" "}
            만약 트렌치코트를 구매할 생각이라면, 정핏의 베이지 트렌치코트보다
            어두운 컬러의 허리선을 강조할 수 있는 트렌치코트를 구매하는 것이
            세련되게 활용을 많이 할 수 있을 것이다.
          </Text>
        </TextBox>
      </Box>
    </Wrapper>
  );
}
