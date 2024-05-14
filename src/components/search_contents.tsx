import styled, { keyframes } from "styled-components";
import { Urls } from "./style1_contents";

const transform_anim = keyframes`
  from {
    transform: translate(500%, 0);
    opacity: 0;
  }
  to {
    transform: translate(0, 0);
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
  height: 300px;
  align-items: center;
  background-color: #ebebeb;
  margin: 20px;
  @media screen and (min-width: 1300px) {
    width: 55%;
  }
  @media screen and (max-width: 700px) {
    width: 95%;
  }
  animation: ${transform_anim} 3s ease-in-out forwards;
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 300px;
  padding: 10px;
`;

const Image = styled.img`
  object-fit: cover;
  height: 280px;
`;

const Image2 = styled.img`
  margin-left: 10px;
  height: 0px;
  width: 0px;

  @media screen and (min-width: 1100px) {
    object-fit: cover;
    height: 280px;
    width: auto;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  padding: 10px;
`;

const Title = styled.p`
  width: inherit;
  font-family: "Nanum Myeongjo", serif;
  white-space: pre-wrap;
  font-size: 18px;
  margin-bottom: 10px;
`;

const Text = styled.p`
  width: inherit;
  font-family: "Nanum Myeongjo", serif;
  white-space: pre-wrap;
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export default function SearchContents({
  handleMenuClick,
  setSelectSearch,
  title,
  contents,
  images,
}: {
  handleMenuClick: (menuTitle: string) => void;
  setSelectSearch: React.Dispatch<React.SetStateAction<boolean>>;
  key_index: number;
  title: string;
  contents: string;
  images: Urls[];
}) {
  const clickSearch = () => {
    handleMenuClick(title);
    setSelectSearch(false);
  };

  return (
    <Wrapper onClick={clickSearch}>
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
}
