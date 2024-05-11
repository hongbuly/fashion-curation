### 프로젝트 소개

- 제 취향의 패션을 소개하는 패션 큐레이션 서비스입니다.
- 캐주얼보단 단정하고 포인트가 있는 패션을 소개합니다.

### 개발 환경

- React
- TypeScript
- Vite
- Firebase(FireStore, Storage, Hosting)

### 프로그램 실행 방법

    npm run dev

### 웹사이트 링크

<https://fashion-curation.web.app>

### 대략적인 파일 소개

---

### App.tsx

상단바

- 앱 타이틀과 검색 버튼
- 스크롤 가능한 글 목록

메인

- 선택된 글 내용

하단바

- 이메일 구독

기능

- Firebase에서 글 목록을 불러와 리스트로 구성
- 선택된 글 타이틀을 contents 컴포넌트에 넘겨 글을 보여줌
- 이메일 입력시 이메일 저장

---

### menus.tsx

- 글 목록을 리스트 하기 위한 컴포넌트로 선택시 밑줄이 진해지고 글 내용을 바꿀 있게 구성

---

### contents.tsx

- 글 내용을 한 단락으로 끊어 단락의 길이만큼 styled1_contents 컴포넌트를 생성

---

### styled1_contents.tsx

- 이미지와 글로 구성
- 화면 크기에 따라 이미지와 글 배치가 달라짐
- 모바일 환경처럼 작은 화면에서는 이미지를 슬라이드로 넘겨볼 수 있게 구성

---

### search.tsx

- 검색어에 글마다 정해놓은 키워드와 겹치는 글들을 search_contents 컴포넌트로 생성

---

### search_contents.tsx

- 단락 기준으로 검색 리스트를 보여줌
- 클릭시 해당 글 전체를 볼 수 있도록 이동
