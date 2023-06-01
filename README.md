![HUTUM](https://raw.githubusercontent.com/mahmud1815003/mahmud1815003.github.io/main/git.PNG)

# Introduction 
<p align="justify">
<b>HUTUM</b> or <b>HUTUM 101</b> is a <a href="https://www.facebook.com/iamhutum">chatbot</a> for the students of <a href="https://kuet.ac.bd/">KUET</a>. The <a href="https://www.facebook.com/iamhutum">chatbot</a> team has maintained telegram groups for sharing movies and series freely available in the internet. But There were no interface of the uploaded movies and series where people can interactively search and download the files. So I have built a <a href="https://hutum101.onrender.com/">website</a> which will track the uploaded movies and series of that telegram groups through a telegram bot and if any new movies uploaded to any of the telegram groups it will update the website database. 
</p>
<br>


# Implementation
This [website](https://hutum101.onrender.com/) is built with:-

1. [React](https://react.dev/) (Frontend) 
2. [Redux Toolkit](https://redux-toolkit.js.org/) (Frontend State Managemnet and API calls)
3. [MUI](https://mui.com/) (UI Tools) 
4. [Node.js](https://nodejs.org/) (Backend)
5. [Express.js](https://expressjs.com/)(Web Framework)
6. [MongoDB](https://www.mongodb.com/) (Database)
7. [TMDB](https://www.themoviedb.org/) (For Movie/Series data)

<p align="justify">
First I have built a layout to show the movies and series. This was built with react and MUI. Then I have built a telegram bot and a server. The telegram bot will track the updates in the telegram groups if any new movies or series uploaded to the groups it send the data to the Expres.js server. This server then search for the movie/series details in TMDB database. Then the server stores the data in mongoDB database. If any user visits the website it the frontend sends API request to server and the server sends the data from the mongoDB. If any user wants to download the movie/series file he/she has to press the download but of the website. Then the telegram bot will send the file to user in his/her telegram ID.
</p>
<br>

# Conclusion
<p align="justify">
This website helps my university student to share the movies and series file among themselves. It was the main purpose of this website. This website is handling daily 1000 users. You can visit my website:
</p>


https://hutum101.onrender.com/


<br>
Jaied Bin Mahmud
<br>
Department of Biomedical Engineering,
<br>
Khulna University of Engineering & Technology,
<br>
Khulna, 9203. 
