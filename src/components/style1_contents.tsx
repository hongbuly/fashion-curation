import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../firebase";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import LoadingScreen from "./loading-screen";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useDispatch } from "react-redux";
import { resetScroll } from "../stores/scrollOffset";

export interface Urls {
  name: string;
  url: string;
}

const UpNextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20%;
  margin-top: 50px;
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
  @media screen and (min-width: 754px) {
    display: flex;
  }
`;

const Image = styled.img`
  width: 450px;

  @media screen and (min-width: 754px) {
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
  @media screen and (max-width: 754px) {
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
  font-size: 30px;
  margin: 0px 10px;
  &:hover {
    color: white;
  }
`;

const ImgListBox = styled.div`
  display: flex;
`;

export default function Style1Contents({
  title,
  index,
  content,
}: {
  title: string;
  index: number;
  content: string;
}) {
  const [isLoading, setLoading] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [imageList, setImageList] = useState<Urls[]>([]);
  const [imageListGroup, setImageListGroup] = useState<Urls[]>([]);
  const [currentImgIndex, setCurrentImgIndex] = useState(1);

  const [style, setStyle] = useState({
    transform: `translateX(-${currentImgIndex}00%)`,
    transition: `all 0.4s ease-in-out`,
  });

  const [textStyle, setTextStyle] = useState({
    transform: `translateX(300%)`,
    transition: `0ms`,
  });

  const [show, setShow] = useState(false);

  // For Mobile
  const mref = useRef<HTMLDivElement>(null);
  const [touch, setTouch] = useState({
    start: 0,
    end: 0,
  });

  // For Scroll Event
  const dispatch = useDispatch<AppDispatch>();

  const nextSlide = () => {
    setCurrentImgIndex(currentImgIndex + 1);
    setStyle({
      transform: `translateX(-${currentImgIndex + 1}00%)`,
      transition: `all 0.4s ease-in-out`,
    });
    if (currentImgIndex === imageList.length) {
      setCurrentImgIndex(1);
      setTimeout(function () {
        setStyle({
          transform: `translateX(-100%)`,
          transition: `0ms`,
        });
      }, 500);
    }
  };

  const prevSlide = () => {
    setCurrentImgIndex(currentImgIndex - 1);
    setStyle({
      transform: `translateX(-${currentImgIndex - 1}00%)`,
      transition: `all 0.4s ease-in-out`,
    });
    if (currentImgIndex === 1) {
      setCurrentImgIndex(imageList.length);
      setTimeout(function () {
        setStyle({
          transform: `translateX(-${imageList.length}00%)`,
          transition: `0ms`,
        });
      }, 500);
    }
  };

  const init = async () => {
    setLoading(true);

    const allImage = ref(storage, title + "/");
    listAll(allImage).then(async (res) => {
      const { items } = res;
      const _urls = await Promise.all(
        items.map((item) => getDownloadURL(item))
      );

      const combine: Urls[] = [];
      const combine_group: Urls[] = [];

      for (let i = 0; i < items.length; i++) {
        if (items[i].name.includes(`group${index}`))
          combine_group.push({ name: items[i].name, url: _urls[i] });
        else if (items[i].name.includes(`g${index}`))
          combine.push({ name: items[i].name, url: _urls[i] });
      }

      setImageList(combine);
      setImageListGroup(combine_group);
      dispatch(resetScroll());
      setLoading(false);
    });
  };

  useEffect(() => {
    init();
  }, [title]);

  const scrollOffset = useSelector(
    (state: RootState) => state.scrollOffset.value
  );

  useEffect(() => {
    if (scrollOffset + 1 == index && !show) {
      console.log(`test : ${scrollOffset}`);
      setTextStyle({
        transform: `translateX(0)`,
        transition: `all 3s ease-in-out forwards`,
      });
      setShow(true);
    } else if (scrollOffset + 1 == index) {
      setTextStyle({
        transform: `translateX(300%)`,
        transition: `0ms`,
      });
      setShow(false);
    }
  }, [scrollOffset]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (imageList[0] == null) {
    return <Text>error</Text>;
  }

  return (
    <UpNextBox>
      <GroupImage>
        <Image src={imageListGroup[0].url} />
      </GroupImage>
      <ImgSliderBox
        onTouchStart={(e) => {
          setTouch({
            ...touch,
            start: e.touches[0].pageX,
          });
        }}
        onTouchMove={(e) => {
          if (mref?.current) {
            const current = mref.current.clientWidth * currentImgIndex;
            const result = -current + (e.targetTouches[0].pageX - touch.start);
            setStyle({
              transform: `translate3d(${result}px, 0px, 0px)`,
              transition: `0ms`,
            });
          }
        }}
        onTouchEnd={(e) => {
          const end = e.changedTouches[0].pageX;
          if (touch.start > end && touch.start - end > 50) {
            nextSlide();
          } else if (end - touch.start > 50) {
            prevSlide();
          }
          setTouch({
            ...touch,
            end,
          });
        }}
      >
        <ImgSlider>
          <ImgListBox ref={sliderRef} style={style}>
            <ImageBox>
              <Image src={imageList[imageList.length - 1].url} />
              <ImageComment>
                {title} -
                {
                  imageList[imageList.length - 1].name
                    .split("-")[2]
                    .split(".")[0]
                }
              </ImageComment>
            </ImageBox>
            {imageList.map((image) => (
              <ImageBox key={image.name}>
                <Image src={image.url} />
                <ImageComment>
                  {title} - {image.name.split("-")[2].split(".")[0]}
                </ImageComment>
              </ImageBox>
            ))}
            <ImageBox>
              <Image src={imageList[0].url} />
              <ImageComment>
                {title} - {imageList[0].name.split("-")[2].split(".")[0]}
              </ImageComment>
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
        <Text style={textStyle} dangerouslySetInnerHTML={{ __html: content }} />
      </TextBox>
    </UpNextBox>
  );
}
