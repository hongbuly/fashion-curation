import styled from "styled-components";
import { SearchItem } from "./search";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  border: 1px solid black;
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const Image = styled.img`
  width: 45%;

  @media screen and (min-width: 754px) {
    width: 20%;
  }
`;

const Image2 = styled.img`
  display: block;

  @media screen and (min-width: 754px) {
    width: 20%;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  width: inherit;
  font-family: "Nanum Myeongjo", serif;
  white-space: pre-wrap;
  font-size: 14px;
`;

const Text = styled.p`
  width: inherit;
  font-family: "Nanum Myeongjo", serif;
  white-space: pre-wrap;
  font-size: 12px;
`;

const SearchContents: React.FC<SearchItem> = ({ title, contents, images }) => {
  return (
    <Wrapper>
      {images.length > 1 ? (
        <ImageBox>
          <Image src={images[0].url} />
          <Image2 src={images[1].url} />
        </ImageBox>
      ) : null}

      <TextBox>
        <Title>{title}</Title>
        <Text dangerouslySetInnerHTML={{ __html: contents }}></Text>
      </TextBox>
    </Wrapper>
  );
};

export default SearchContents;
