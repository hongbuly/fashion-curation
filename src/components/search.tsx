import styled from "styled-components";
import { MdOutlineSearch } from "react-icons/md";
import { IMenu } from "../App";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { Urls } from "./style1_contents";
import { useState } from "react";
import SearchContents from "./search_contents";

export interface SearchItem {
  title: string;
  contents: string;
  images: Urls[];
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 40px 0px;
  width: 100%;
`;

const ScrollView = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  white-space: nowrap;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 30px;
  width: 60%;
  border: 1px solid black;
  margin-top: 10px;
  align-items: center;
  padding-left: 10px;
`;

const SearchText = styled.input`
  width: 100%;
  padding: 5px 10px;
  border: 0px;
`;

export default function Search({ menus }: { menus: IMenu[] }) {
  const [searchItem, setSearchItem] = useState<SearchItem[]>([]);

  const showSearch = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const searchElement = document.getElementById(
        "search"
      ) as HTMLInputElement | null;
      const search = searchElement ? searchElement.value : "";
      const splitSearch = search.split(" ");

      const sItems: SearchItem[] = [];

      // TODO : splitSearch 중 keyword가 겹치는 글들 보여주기
      for (let mIndex = 0; mIndex < menus.length; mIndex++) {
        const menusQuery = query(collection(db, menus[mIndex].title));
        const snapshot = await getDocs(menusQuery);
        const size = snapshot.size;

        for (let index = 0; index < size; index++) {
          const contentsQuery = doc(db, menus[mIndex].title, index.toString());
          const snapshot2 = await getDoc(contentsQuery);
          if (snapshot2.exists()) {
            const { contents, keyword } = snapshot2.data();
            const correct = splitSearch.filter((item) =>
              keyword.includes(item)
            );
            if (Array.isArray(correct) && correct.length !== 0) {
              const allImage = ref(storage, menus[0].title + "/");

              listAll(allImage).then(async (res) => {
                const { items } = res;
                const _urls = await Promise.all(
                  items.map((item) => getDownloadURL(item))
                );

                const combine: Urls[] = [];

                for (let i = 0; i < items.length; i++) {
                  if (items[i].name.includes(`g${index}`))
                    combine.push({ name: items[i].name, url: _urls[i] });
                }

                const sItem: SearchItem = {
                  title: menus[mIndex].title + "-" + index,
                  contents: contents,
                  images: combine,
                };
                sItems.push(sItem);
              });
            }
          }
        }
      }

      setSearchItem(sItems);
    }
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

      <ScrollView>
        {searchItem.map((search) => (
          <SearchContents key={search.title} {...search} />
        ))}
      </ScrollView>
    </Wrapper>
  );
}
