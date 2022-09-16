console.log("Welcome to Spotify")

// Initialize the Variable
let songIndex=0;
let audioElement=new Audio('songs/1.mp3')
let masterPlay=document.getElementById("masterPlay")
let myProgressBar=document.getElementById("myProgressBar")
let gif=document.getElementById("gif");
let songItems=Array.from( document.getElementsByClassName("songItem"))
let masterSongName=document.getElementById("masterSongName")
let masterSongTime=document.getElementById("masterSongTime")
let songIndexPrevious=0;

myProgressBar.value=0
let songs=[
    {songName:"Apna Time Aayega - Gully Boy",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    {songName:"Bandeya Rey Bandeya - Simmba",filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
    {songName:"Ek Ladki Ko Dekha Toh Aisa Laga",filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
    {songName:"Gulabi Aankhen - SANAM",filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
    {songName:"Makhna - Yo Yo Honey Singh",filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
    {songName:"Mera Dil Bhi Kitna Pagal Hai",filePath:"songs/6.mp3",coverPath:"covers/6.jpg"},
    {songName:"Qaafirana - Kedarnath",filePath:"songs/7.mp3",coverPath:"covers/7.jpg"},
    {songName:"Tere Bin - Simmba",filePath:"songs/8.mp3",coverPath:"covers/8.jpg"},
    {songName:"Chogada - Loveratri",filePath:"songs/9.mp3",coverPath:"covers/9.jpg"},
    {songName:"Mere Mehboob Qayamat Hoti - SANAM",filePath:"songs/10.mp3",coverPath:"covers/10.jpg"}
]


songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath
    element.getElementsByClassName("songName")[0].innerHTML=songs[i].songName
})

// Play/Pause click
masterPlay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime==0){
        audioElement.play();
        songPlayingName(songIndex)
        songisPlaying(songIndex)
    }
    else{
        audioElement.pause();
        songisPaused(songIndex)
    }
})

// Listen to events 
audioElement.addEventListener("timeupdate",()=>{
    // automatically increase myProgressBar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100)                   //here / is divide we are taking out the percentage the song has been played
    myProgressBar.value=progress;
})

// myProgressBar.addEventListener("change",()=>{
//     audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
// })

// Clicking on div
Array.from(document.getElementsByClassName("songItem")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        songIndexPrevious=songIndex;
        songIndex=parseInt(e.target.id);
        if(songIndexPrevious!=songIndex){
            audioElement.src = `songs/${songIndex+1}.mp3`;
            audioElement.currentTime=0;
            songPlayingName(songIndex)
        }
        if(audioElement.paused || audioElement.currentTime==0){
            console.log("playing song")
            console.log(audioElement.currentTime==0)
            console.log(audioElement.paused)
            audioElement.play();
            songisPlaying(songIndex)
        }
        else{
            console.log(audioElement.currentTime==0)
            console.log(audioElement.paused)
            audioElement.pause();
            songisPaused(songIndex)
        }
    })
})

//Previous Song
document.getElementById("previous").addEventListener("click",()=>{
    if(songIndex <= 0 ){
        songIndex=9
    }
    else{
        songIndex-= 1
    }
    songChangeUpdates(songIndex)
    songisPlaying(songIndex)
})

//Next Song 
document.getElementById("next").addEventListener("click",()=>{
    if(songIndex >= 9 ){
        songIndex=0
    }
    else{
        songIndex+= 1
    }
    songChangeUpdates(songIndex)
    songisPlaying(songIndex)
})

const makeAllPlays= ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
    Array.from(document.getElementsByClassName("songItem")).forEach((element)=>{
        element.style.opacity=1
        element.style.backgroundColor="white"
    })
}

function songPlayingName(index){
    console.log("printing",index)
    masterSongName.innerHTML=songs[index].songName
    masterSongTime.innerHTML="05:34"
}

function songisPlaying(index){
    makeAllPlays()
    masterPlay.classList.add("fa-pause")
    masterPlay.classList.remove("fa-play")
    document.getElementsByClassName("songItemPlay")[songIndex].classList.add("fa-pause")
    document.getElementsByClassName("songItemPlay")[songIndex].classList.remove("fa-play")
    gif.style.opacity=1
    document.getElementsByClassName("songItem")[songIndex].style.backgroundColor = "rgb(42, 140, 253)"
}

function songisPaused(index){
    makeAllPlays()
    masterPlay.classList.add("fa-play")
    masterPlay.classList.remove("fa-pause")
    document.getElementsByClassName("songItemPlay")[songIndex].classList.add("fa-play")
    document.getElementsByClassName("songItemPlay")[songIndex].classList.remove("fa-pause")
    gif.style.opacity=0
    document.getElementsByClassName("songItem")[songIndex].style.opacity=0.8
}

function songChangeUpdates(index){
    audioElement.src = `songs/${index+1}.mp3`;
    audioElement.currentTime=0
    audioElement.play()
    songPlayingName(index)
}

//To change the song As it overs
setInterval(() => {
    if(audioElement.duration==audioElement.currentTime){
        console.log("It entered")
        document.getElementById("next").click()
    }
}, 500);
