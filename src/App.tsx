import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useRef, useState } from "react";
import { db } from "./firebase";
import Menu from "./components/menu";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import Contents from "./components/contents";
import { v4 as uuidv4 } from "uuid";
import { MdOutlineSearch } from "react-icons/md";
import Search from "./components/search";
import { useDispatch, useSelector } from "react-redux";
import { setFalse, toggle } from "./stores/selectSearch";
import { AppDispatch, RootState } from "./store";
import {
  downCurrentScroll,
  resetScroll,
  upCurrentScroll,
} from "./stores/scrollOffset";
import { setMenus } from "./stores/menus";
import { setSelectMenu } from "./stores/selectMenu";

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: white;
    color:black;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const SizedBox = styled.div`
  width: 1px;
`;

const AppBarMenu = styled.div`
  position: absolute;
  width: 100%;
  z-index: 1000;
`;

const AppBar = styled.div`
  height: fit-content;
  width: 100%;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
  background-color: white;
`;

const AppTitle = styled.h1`
  font-size: 24px;
  align-self: center;
  font-family: "Bigshot One", serif;
  font-weight: 400;
  font-style: normal;
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  border: 0;
  background-color: transparent;
  font-size: 24px;
  padding-top: 13px;
  padding-bottom: 6px;
  padding-left: 5px;
  padding-right: 5px;
  align-self: center;
  margin-right: 5px;
  color: #0000009b;
  &:hover {
    color: black;
  }
`;

const ScrollMenu = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  height: 50px;
  white-space: nowrap;
  font-size: 0;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ScrollView = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  white-space: nowrap;
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubscribeText = styled.p`
  color: #393939;
  font-size: 14px;
  margin-top: 20px;
`;

const EmailText = styled.input`
  height: 30px;
  width: 300px;
  border: 1px solid black;
  margin-top: 10px;
  padding: 5px 10px;
`;

const Subscribe = styled.button`
  border: 1px solid black;
  border-radius: 10px;
  background-color: transparent;
  font-size: 14px;
  align-self: center;
  margin-top: 10px;
  padding: 10px 30px;
  color: black;
  cursor: pointer;
  &:active {
    color: grey;
  }
`;

function App() {
  const menus = useSelector((state: RootState) => state.menus.value);
  const selectMenu = useSelector((state: RootState) => state.selectMenu.value);
  const scrollMenuRef = useRef<HTMLDivElement>(null);
  const selectSearch = useSelector(
    (state: RootState) => state.selectSearch.value
  );
  const dispatch = useDispatch<AppDispatch>();

  const scrollViewRef = useRef<HTMLDivElement>(null);
  const scrollOffset = useSelector(
    (state: RootState) => state.scrollOffset.value
  );
  const prevScrollY = useRef(0);
  const [style, setStyle] = useState({
    transform: `translateY(0%)`,
    transition: `0ms`,
  });

  const fetchMenu = async () => {
    const menusQuery = query(
      collection(db, "menus"),
      orderBy("createdAt", "desc")
    );
    try {
      const snapshot = await getDocs(menusQuery);
      const menus = snapshot.docs.map((doc) => {
        const { title, createdAt } = doc.data();
        return {
          id: doc.id,
          title,
          createdAt,
          selected: false,
          onClick: () => {},
        };
      });

      dispatch(setMenus(menus));
      setSelectMenu(menus[0].title);
    } catch (e) {
      console.log("Firebase Error : 파이어베이스 사용 가능량 초과");
    }
  };

  useEffect(() => {
    fetchMenu();
    dispatch(resetScroll());
  }, []);

  useEffect(() => {
    handleMenuClick(selectMenu);
  }, [selectMenu]);

  const handleMenuClick = (menuTitle: string) => {
    dispatch(setSelectMenu(menuTitle));

    const selectedMenuIndex = menus.findIndex(
      (menu) => menu.title === menuTitle
    );

    // selected menu move to center of window
    if (scrollMenuRef.current?.scrollWidth) {
      const scrollLeft =
        (scrollMenuRef.current?.scrollWidth / menus.length) * selectedMenuIndex;
      if (scrollMenuRef.current && typeof scrollLeft === "number") {
        if (scrollLeft > 170) {
          scrollMenuRef.current.scrollLeft =
            scrollLeft - scrollMenuRef.current?.scrollWidth / 6;
        } else {
          scrollMenuRef.current.scrollLeft = 0;
        }
      }
    }
  };

  const handleSubscribeClick = async () => {
    const subscribe_text = document.getElementById("subscribe_text");
    const emailElement = document.getElementById(
      "email"
    ) as HTMLInputElement | null;
    const email = emailElement ? emailElement.value : "";

    if (email != "") {
      const emailId = uuidv4(); // hash id
      setDoc(doc(db, "emails", emailId), { email: email });
      if (subscribe_text) {
        subscribe_text.innerText = "이메일 구독이 되었습니다.";
      }
    }
  };

  const searchClick = async () => {
    dispatch(toggle());
  };

  const goToHome = async () => {
    dispatch(setFalse());
  };

  const handleScroll = () => {
    if (scrollViewRef.current?.scrollHeight) {
      const moveOffset = scrollViewRef.current?.scrollTop - prevScrollY.current;
      if (moveOffset > 30) {
        // scroll down animation
        setStyle({
          transform: `translateY(-100px)`,
          transition: `all 1s ease-in-out`,
        });
        prevScrollY.current = scrollViewRef.current?.scrollTop;

        console.log(
          `scroll : ${scrollViewRef.current?.scrollTop}, ${scrollOffset + 1}`
        );
        if (scrollViewRef.current?.scrollTop > (scrollOffset + 1) * 700) {
          dispatch(upCurrentScroll());
        }
      } else if (moveOffset < -30) {
        // scroll up animation
        setStyle({
          transform: `translateY(0px)`,
          transition: `all 1s ease-in-out`,
        });
        prevScrollY.current = scrollViewRef.current?.scrollTop;

        if (scrollViewRef.current?.scrollTop < (scrollOffset + 1) * 700) {
          dispatch(downCurrentScroll());
        }
      }
    }
  };

  return (
    <Wrapper>
      <GlobalStyles />
      <AppBarMenu style={style}>
        <AppBar>
          <SizedBox />
          <AppTitle onClick={goToHome}>honghyun</AppTitle>
          <Button onClick={searchClick}>
            <MdOutlineSearch />
          </Button>
        </AppBar>
        <ScrollMenu onClick={goToHome} ref={scrollMenuRef}>
          {menus.map((menu) => (
            <Menu
              key={menu.id}
              {...menu}
              onClick={() => handleMenuClick(menu.title)}
              selected={menu.title === selectMenu}
            />
          ))}
        </ScrollMenu>
      </AppBarMenu>

      {selectSearch ? (
        <Search />
      ) : (
        <ScrollView ref={scrollViewRef} onScroll={handleScroll}>
          <ContentWrapper>
            <Contents title={selectMenu} />
          </ContentWrapper>
          <BottomWrapper>
            <SubscribeText id="subscribe_text">
              이메일을 입력하고, 새로운 글을 놓치지 마세요.
            </SubscribeText>
            <EmailText
              id="email"
              type="text"
              placeholder="example@example.com"
            />
            <Subscribe onClick={handleSubscribeClick}>
              뉴스레터 구독하기
            </Subscribe>
          </BottomWrapper>
        </ScrollView>
      )}
    </Wrapper>
  );
}

export default App;
