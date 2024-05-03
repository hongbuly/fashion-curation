import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import LoadingScreen from "./loading-screen";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../firebase";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export interface Urls {
  name: string;
  url: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 0px;
  width: 80%;
  @media screen and (max-width: 755px) {
    width: 100%;
  }
`;

const UpNextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 1200px) {
    flex-direction: row;
  }
`;

const ImageBox = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 755px) {
    display: flex;
  }
`;

const GroupImage = styled.div`
  display: none;
  justify-content: center;
  @media screen and (min-width: 755px) {
    display: flex;
  }
`;

const Image = styled.img`
  width: 450px;

  @media screen and (min-width: 755px) {
    width: 600px;
  }
`;

const ImageComment = styled.p`
  font-size: 10px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const Text = styled.p`
  width: inherit;
  font-family: "Nanum Myeongjo", serif;
  white-space: pre-wrap;
  font-size: 17px;
`;

const ImgSliderBox = styled.div`
  display: none;
  position: relative;
  @media screen and (max-width: 755px) {
    display: block;
  }
`;

const ImgSlider = styled.div`
  overflow-x: hidden;
  max-width: 450px;
  min-width: 280px;
  width: max-content;
`;

const SliderButtonBox = styled.div`
  position: absolute;
  width: 450px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  top: 50%;
`;

const SliderButton = styled.button`
  background-color: transparent;
  color: #ffffffba;
  border: none;
  border-radius: 50%;
  font-size: 30px;
  margin: 0px 10px;
  &:hover {
    color: white;
  }
`;

const ImgListBox = styled.div`
  display: flex;
`;

export default function SSWM2024() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [isLoading, setLoading] = useState(true);
  const [imageList, setImageList] = useState<Urls[]>([]);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [style, setStyle] = useState({
    transform: `translateX(-${currentImgIndex}00%)`,
    transition: `all 0.4s ease-in-out`,
  });

  const nextSlide = () => {
    const index = currentImgIndex + 1 > 1 ? 0 : currentImgIndex + 1;
    setCurrentImgIndex(index);
    setStyle({
      transform: `translateX(-${index}00%)`,
      transition: `all 0.4s ease-in-out`,
    });
  };

  const prevSlide = () => {
    const index = currentImgIndex - 1 < 0 ? 1 : currentImgIndex - 1;
    setCurrentImgIndex(index);
    setStyle({
      transform: `translateX(-${index}00%)`,
      transition: `all 0.4s ease-in-out`,
    });
  };

  const init = () => {
    const allImage = ref(storage, "ss_wm2024/");

    listAll(allImage).then(async (res) => {
      const { items } = res;
      const _urls = await Promise.all(
        items.map((item) => getDownloadURL(item))
      );

      const combine: Urls[] = [];

      for (let i = 0; i < items.length; i++) {
        combine.push({ name: items[i].name, url: _urls[i] });
      }

      setImageList(combine);
      setLoading(false);
    });
  };

  useEffect(() => {
    init();
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Wrapper>
      <UpNextBox>
        <GroupImage>
          <Image
            src={imageList.find((item) => item.name.includes("group01"))!.url}
          />
        </GroupImage>
        <ImgSliderBox>
          <ImgSlider>
            <ImgListBox ref={sliderRef} style={style}>
              <ImageBox>
                <Image
                  src={
                    imageList.find((item) => item.name.includes("look01"))!.url
                  }
                />
                <ImageComment>24 ss women - dries van noten</ImageComment>
              </ImageBox>
              <ImageBox>
                <Image
                  src={
                    imageList.find((item) => item.name.includes("look02"))!.url
                  }
                />
                <ImageComment>24 ss women - dior</ImageComment>
              </ImageBox>
            </ImgListBox>
          </ImgSlider>

          <SliderButtonBox>
            <SliderButton onClick={prevSlide}>
              <IoIosArrowBack />
            </SliderButton>
            <SliderButton onClick={nextSlide}>
              <IoIosArrowForward />
            </SliderButton>
          </SliderButtonBox>
        </ImgSliderBox>
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
      </UpNextBox>
    </Wrapper>
  );
}
