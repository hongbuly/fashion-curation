import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { MdOutlineSearch } from "react-icons/md";
import Menu from "./components/menu";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export interface IMenu {
  id: string;
  title: string;
  createdAt: number;
}

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

const AppBar = styled.div`
  height: fit-content;
  width: 100%;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
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
`;

const ScrollMenu = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
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
`;

function App() {
  const [menus, setMenu] = useState<IMenu[]>([]);
  const [isLoading, setLoading] = useState(true);

  const init = async () => {
    //wait for firebase
    setLoading(false);
  };

  const fetchMenu = async () => {
    const menusQuery = query(
      collection(db, "menus"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(menusQuery);
    const menus = snapshot.docs.map((doc) => {
      const { title, createdAt } = doc.data();
      return {
        id: doc.id,
        title,
        createdAt,
      };
    });

    setMenu(menus);
  };

  useEffect(() => {
    init();
    fetchMenu();
  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      <AppBar>
        <SizedBox />
        <AppTitle>honghyun</AppTitle>
        <Button>
          <MdOutlineSearch />
        </Button>
      </AppBar>
      <ScrollMenu>
        {menus.map((menu) => (
          <Menu key={menu.id} {...menu} />
        ))}
      </ScrollMenu>
      <ScrollView></ScrollView>
      <BottomWrapper>
        <SubscribeText>
          이메일을 입력하고, 새로운 글을 놓치지 마세요.
        </SubscribeText>
        <EmailText type="text" placeholder="example@example.com" />
        <Subscribe>뉴스레터 구독하기</Subscribe>
      </BottomWrapper>
    </Wrapper>
  );
}

export default App;
