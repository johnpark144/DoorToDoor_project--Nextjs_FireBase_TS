---------- <a href="README_KOR.md">한글로 보기(KOR)</a> ----------
# DoorToDoor_project--Nextjs_FireBase_TS
- Website Link : https://port-0-doortodoor-1jx7m2gldonqeix.gksl1.cloudtype.app/
- Backend (firebase for me) : https://console.firebase.google.com/u/0/project/doortodoor-e6943/firestore/data/~2FmarkedDataDetail~2F7Om2QvmfVib5f9vD46Ib
- Creater : Yeonghwan Park (John Park)
- Main Tools : Next JS (ver 13), TypeScript
- CSS : Tailwind CSS
- Sub Tools : FireBase, Redux(toolkit), React-leaflet, Nominatim API, TileLayer, React-date-range, React-timeago, PhotoShop
- Idea or Not : Idea 95%, Clone 5% (only some of how to use Nominatim API)
- Bundler : Webpack

- Nominatim API (https://nominatim.org/release-docs/latest/) -> To find address
- TileLayer API (https://cloud.maptiler.com/) -> Many kind of maps

- Explantion : I and My members used to do surveys door to door, Meanwhile, I found it uncomfortable that We unknowingly went to the same house that someone already visited recently, so It was not reasonable at all but a waste of time. on top of this, in the point of neighborhood, They also were not pleased with this either, since they were bothered. so I first learned to handle Map and Calendar and then came to build this website for both ends by my experience and idea, You can check markers that others visited and You can also mark and leave some comments. The marker will fade over time and disappear over 2years.

- Hard Part and Solution :
1. It was my first time to use map library and Api about geography, and I was worried about how to save latitude and longitude information in Firebase database. It took me a day to find out that there was a separate data storage format for latitude and longitude.
2. I found out that saving each datas every single time to click the locations is too frequent and inefficient. so I came to save them in array format. but in that sense, It was hard to input detail datas about that location and update and delete it, so the solution was putting all arrays in one array with latitude and longitude together and then using map-method to spread the array so that only user who input the latitude and longitude can create, update or delete.

- Things To Fix or Improve : need to get this clean code, better English-comment's grammer, Change the common password for personal use
- Login Must ? : Yes (only sign-up not oath for personal-use)
- Name why : The meaning of "door to door" has going around houses, so I named it for it fits the purpose of this web site and I came up with a good idea for the logo

- Comment language : English
- Date of creation : Jan 11th ~ Jan 19th 2023
- Date of debugging : Jan 19th ~ Jan 20th 2023 (clean code, fix error, comment)
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
