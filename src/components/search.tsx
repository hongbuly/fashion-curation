import styled from "styled-components";
import { MdOutlineSearch } from "react-icons/md";
import { IMenu } from "../App";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { Urls } from "./style1_contents";
import { useState } from "react";
import SearchContents from "./search_contents";
import LoadingScreen from "./loading-screen";

export interface SearchItem {
  key_index: number;
  title: string;
  contents: string;
  images: Urls[];
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 80vh;
  margin-top: 150px;
`;

const ScrollView = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  align-items: center;
  white-space: nowrap;
  width: 100%;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 30px;
  width: 55%;
  border: 1px solid black;
  margin-bottom: 10px;
  align-items: center;
  padding-left: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  @media screen and (min-width: 1300px) {
    width: 40%;
  }
  @media screen and (max-width: 700px) {
    width: 95%;
  }
`;

const SearchText = styled.input`
  width: 100%;
  padding: 5px 10px;
  border: 0px;
`;

const ResultText = styled.p`
  font-family: "Nanum Myeongjo", serif;
  white-space: pre-wrap;
  font-size: 17px;
  margin-bottom: 50px;
`;

export default function Search({
  handleMenuClick,
  menus,
}: {
  handleMenuClick: (menuTitle: string) => void;
  menus: IMenu[];
}) {
  const [isLoading, setLoading] = useState(false);
  const [searchItem, setSearchItem] = useState<SearchItem[] | null>(null);

  const showSearch = async (e: React.KeyboardEvent) => {
    setLoading(true);
    if (e.key === "Enter") {
      console.log("Enter!");
      const searchElement = e.target as HTMLInputElement;
      const search = searchElement.value;
      const splitSearch = search.split(" ");

      const sItems: SearchItem[] = [];

      let key_index = 1;

      // TODO : splitSearch 중 keyword가 겹치는 글들 보여주기
      for (let mIndex = 0; mIndex < menus.length; mIndex++) {
        const menusQuery = query(collection(db, menus[mIndex].title));
        const snapshot = await getDocs(menusQuery);
        const size = snapshot.size;

        for (let index = 1; index < size + 1; index++) {
          const contentsQuery = doc(db, menus[mIndex].title, index.toString());
          const snapshot2 = await getDoc(contentsQuery);
          if (snapshot2.exists()) {
            const { contents, keyword } = snapshot2.data();
            const correct = splitSearch.filter((item) =>
              keyword.includes(item)
            );
            if (Array.isArray(correct) && correct.length !== 0) {
              const allImage = ref(storage, menus[mIndex].title + "/");

              const res = await listAll(allImage);
              const _urls = await Promise.all(
                res.items.map((item) => getDownloadURL(item))
              );

              const combine: Urls[] = [];

              for (let i = 0; i < res.items.length; i++) {
                if (res.items[i].name.includes(`g${index}`))
                  combine.push({ name: res.items[i].name, url: _urls[i] });
              }

              const sItem: SearchItem = {
                key_index: key_index++,
                title: menus[mIndex].title,
                contents: contents,
                images: combine,
              };
              sItems.push(sItem);
            }
          }
        }
      }

      setSearchItem(sItems.length > 0 ? sItems : null);
    }
    setLoading(false);
  };

  return (
    <Wrapper>
      <SearchBox>
        <MdOutlineSearch />
        <SearchText
          id="search"
          type="text"
          placeholder="어떤 글을 찾으시나요? ex)트렌치코트, 벨트"
          onKeyDown={(e) => showSearch(e)}
        />
      </SearchBox>

      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ScrollView>
          {searchItem === null ? (
            <ResultText>검색 결과가 없습니다.</ResultText>
          ) : (
            searchItem.map((search) => (
              <SearchContents
                handleMenuClick={handleMenuClick}
                key={search.key_index}
                {...search}
              />
            ))
          )}
        </ScrollView>
      )}
    </Wrapper>
  );
}
