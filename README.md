# Hello Soomgo

## 실행 방법

```bash
# 패키지 설치
yarn install

# devServer 실행 (http://localhost:8080)
yarn dev

# storybook 실행 (http://localhost:6006)
yarn ui
```

## 데모

https://divlook-soomgo-homework.netlify.app/

## 프로젝트 스펙

### 언어

- TypeScript

### 프레임워크

- Vue 2

### 기타

- Sass
- Storybook

### 페이지

- Home : 시작 화면
- Form : 요청서 폼 화면
### 컴포넌트

자세한 정보는 storybook을 실행하여 확인 부탁드립니다.

- Btn : 버튼 컴포넌트
- Checklist : 체크리스트 컴포넌트
- Checkbox : 체크박스 컴포넌트
- Radio : 라디오 컴포넌트
- Selectbox : 선택상자 컴포넌트
- TextInput : 텍스트 입력기 컴포넌트

## 설명

`vue-cli`를 사용하여 기본 환경을 구성하였고 개발 편의를 위해 추가적으로 `vuex-module-decorators`, `storybook` 패키지를 설치하였습니다.

시작 화면에서 `신청하기` 버튼 클릭시 요청서 폼 화면으로 이동되고, 모든 질문에 답변 입력 후 `제출하기` 버튼을 클릭하면 다시 시작 화면으로 돌아오게 작업하였습니다.

output.json 내용은 `제출하기` 버튼 클릭시 `store`에 저장하여 `alert`으로 한번 보여준 뒤 시작화면에 출력되도록 하였습니다.
