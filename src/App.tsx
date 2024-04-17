import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { MdOutlineSearch } from "react-icons/md";

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

const Menu = styled.div`
  display: inline-block;
  width: auto;
  height: 30px;
  border-bottom: 1px solid black;
  background: #fff;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  margin-left: 50px;
  margin-right: 50px;
`;

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    //wait for firebase
    await auth.authStateReady();
    setLoading(false);
  };
  useEffect(() => {
    init();
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
        <Menu>24 fw</Menu>
        <Menu>24 ss</Menu>
        <Menu>23 fw</Menu>
        <Menu>23 ss</Menu>
        <Menu>22 fw</Menu>
        <Menu>22 ss</Menu>
        <Menu>21 fw</Menu>
        <Menu>21 ss</Menu>
      </ScrollMenu>
    </Wrapper>
  );
}

export default App;
