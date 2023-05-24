<a href="README_KOR.md">한글로 보기(KOR)</a>
# DoorToDoor_project--Nextjs_FireBase_TS
- 웹사이트 링크 : https://port-0-doortodoor-1jx7m2gldonqeix.gksl1.cloudtype.app/
- 백엔드 (파이어베이스 for me) : https://console.firebase.google.com/u/0/project/doortodoor-e6943/firestore/data/~2FmarkedDataDetail~2F7Om2QvmfVib5f9vD46Ib
- 만든이 : 박영환(John Park)
- 주요 도구 : Next JS (ver 13), TypeScript
- CSS : Tailwind CSS
- 보조 도구 : FireBase, Redux(toolkit), React-leaflet, Nominatim API, TileLayer, React-date-range, React-timeago, PhotoShop
- 아이디어 여부 : 아이디어 95%, 클론 5% (Nominatim API를 쓰는 방법에 대해서만)
- 번들러 도구 : Webpack

- Nominatim API (https://nominatim.org/release-docs/latest/) -> 주소를 찾기 위해
- TileLayer API (https://cloud.maptiler.com/) -> 많은 종류의 맵들

- 설명 : 미국에서 나와 내 지인들은 집집마다 돌아다니며 설문조사를 하는일을 한적 있었습니다, 그러던 중에 어느날 나는 지인들이 최근에 이미 방문한 집에 나도모르게 다시 갔었고, 이게 너무 자주 발생해서 시간낭비라 생각이 되었습니다. 게다가 이웃들의 관점에서도 짜증나겠다 싶었습니다. 그래서 저는 먼저 지도와 달력을 다루는 API를 배웠고, 이 둘의 불편함을 해소하기위해 경험과 아이디어를 기반으로 이 사이트를 짓게 되었습니다. 다른 사람이 방문한 곳을 확인 할 수 있고, 나도 그것을 마킹하고 코멘트를 남길 수 있습니다. 마커는 시간이 지나며 흐려질 것이고, 2년이 지나면 사라질 것입니다.

- 어려웠던점 및 해결책 :
1. 지도 라이브러리와 지리에 대한 API를 사용하는 것은 처음이었고, 파이어베이스 DB에 어떻게 위도와 경도 정보를 저장할지 고민했었습니다. 그 후 위도와 경도에 대해 별도의 데이터 저장 형식이 있다는 것을 하루종일 시간낭비 하고 나서야 알게되었습니다.
2. 위치를 클릭할때 마다 데이터를 매번 저장하는 것은 너무 빈번하고 비효율적이라는 것을 알게 되었고 그래서 배열형식으로 저장하기로 했습니다. 하지만 그런 방식에선 그 위치에 대한 상세한 데이터를 입력하고 업데이트하고 삭제하는 것은 어려웠습니다.
그래서 생각해낸 해결책은 경도와 위도의 데이터를 가진 모든 배열을 가져와 하나로 합쳐서 고차함수 map을 사용하여 배열을 한번에 펼치므로써, 해당 유저만 상세한 데이터를 입력하고 업데이트하고 삭제할수 있도록 하게 하였다.

- 고쳐야 하거나 개선이 필요한 점 : 클린코드로 바꾸기, 알아보기 쉬운 영어주석, 전체 비밀번호를 개인사용을 위해 바꾸기 (현재 : 1948)
- 로그인 필수 ? : Yes (개인 사용위해 SNS 로그인은 부적합하다 판단하여, 오직 회원가입 한 사람만)
- 프로젝트 이름 이유 : "door to door"의 의미는 "집집마다 돌아다니다" 라는 의미를 내포하고 있습니다. 그래서 이 웹사이트의 목적에 맞게 이름을 지었고, 그 이름에 맞는 좋은 로고 아이디어가 떠올랐습니다

- 주석 언어 : 영어
- 만든기간 : 2023년 1월 11일 ~ 2023년 1월 19일
- 디버깅기간 : 2023년 1월 19일 ~ 1월 20일 (클린코드, 오류 점검, 주석)
- Date of upload : <strike>Jan 20th</strike> -> Feb 3rd 2023
- Date of 1st deployment : Jan 20th 2023
- Deployment Tool : <strike>Vercel</strike> ->  Cloudtype

# Ps, FYI
- Since I will personally use this cusomizing my needs, I didn't allow Oauth-signup,
 and plus I made common password to let only my people know for the site security, Sorry for disconvenience and Please bear with me
- I will deploy 2 websites with this, one for public and portfolio and one for my people who will personally use with 2 different common password and DataBase
- Public Website's Common Password is "1948"

# Functions
- Responsive Website
- Auth (SignIn, Login, Logout)
- Spinner Loading
- Navigation bar(Header)
- Map (leaflet, OpenStreetMap)
- Search Address and Locate a pin in the Map
- Swicth Map (Regular, Satellite) 
- Edit Mode
1) Date pick from Calender and input the Date (Default : today)
2) Switch Marker Color (Blue marker or Green marker)
3) Putting marker on the Map and Save it
4) Cancel
5) Return
- Popup on marker (Date, Timeago, Pointer's Name, Info that Pointer input)
- Popup Edit Mode (Edit Detail Info, Delete Marker -> only In case of you being Pointer) 
- Marker opacity : over 6 month ->  0.6 / over 1 year ->  0.3 / over 2 year -> disapear

# Sample pictures
- Home and Search
![Home,Search](https://user-images.githubusercontent.com/106279616/213786393-cbe7d301-83e3-4a2f-9c6d-82d8c04fc02f.png)
- Edit Mode
![Edit](https://user-images.githubusercontent.com/106279616/213785475-98868196-84a2-488d-b783-e033125719c5.png)
- FireBase
![Firebase](https://user-images.githubusercontent.com/106279616/213785520-718a13bd-81ab-4a1f-a9c8-8a1e89e0cccf.png)


# Sample videos
<h3> 1. Search, Switch Map </h3>
<video src="https://user-images.githubusercontent.com/106279616/213798582-96fc4ded-baf3-4d41-83b8-53490b474d47.mp4"></video>

<h3> 2. Put Markers (Edit Mode) </h3>
<video src="https://user-images.githubusercontent.com/106279616/213798659-a80fa925-4195-42de-995b-360d86bdd2bd.mp4"></video>

<h3> 3. Delete, Edit Detail, View in Deferent Account </h3>
<video src="https://user-images.githubusercontent.com/106279616/213798727-036a3e73-2a53-4036-906b-5126d46f9640.mp4"></video>

<h3> 4. Signup, Login </h3>
<video src="https://user-images.githubusercontent.com/106279616/213798790-f75abdaa-3d70-4982-a36b-ef14e9e17aeb.mp4"></video>
