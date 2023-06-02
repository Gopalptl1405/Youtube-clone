let SearchInput = document.getElementById("search-input");
const apiKey = "AIzaSyDHfkceXrC0w8xUnAeEDfRqnlL52QA44CQ";
let container = document.getElementById("container");
let button = document.getElementById("mybtn");
// console.log(button);
// https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=salman&key=AIzaSyDHfkceXrC0w8xUnAeEDfRqnlL52QA44CQ;

button.addEventListener("click", SearchVideo);

function SearchVideo(){
   let SearchValue = SearchInput.value;
 // fetch list of video for whatever video user search;
//  console.log(SearchValue)
   fetchData(SearchValue);
}

async function fetchData(SearchValue){
   try{
    let endPoint = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${SearchValue}&key=${apiKey}`;

    let response = await fetch(endPoint);
    let datalist = await response.json();
    // console.log(datalist);
    // console.log(datalist.items[0].snippet.thumbnails.high.url);
   for(let item of datalist.items){
    let videoId = item.id.videoId;
    let videoStats =await fetchStats(videoId);
    // console.log(videoStats.viewCount);
    // console.log(videoStats.items[0].statistics);
    if(videoStats.items.length>0)    
    item.videoStats=videoStats.items[0].statistics; 
    item.duration=videoStats.items[0] && videoStats.items[0].contentDetails.duration;
  
   }
    renderList(datalist.items);   
  }
   catch(error){
    alert("Something Went Error "+ error);
   }
}
function formatVeiw(viewCount){
      if(viewCount<1000){
        return viewCount;
      }
      else if(viewCount >=1000 && viewCount <= 999999)
      {
        const thousand = parseInt(viewCount / 1000);
        return thousand + "K";
      }
      else if(viewCount >= 1000000){
            const millians = parseInt(viewCount/10000);
            return millians + "M";
      }
}
function renderList(items){
    container.innerHTML = "";
    for(let i=0; i < items.length; i++)
    {
       let videolist = items[i];
    //    console.log(videolist);
       let img_url = videolist.snippet.thumbnails.high.url;
       let videoElement = document.createElement("div");
    //    console.log(videolist.videoStats);
       let videoChildren = `
          <img src="${img_url}" /> 
          <div class="video-info">
                <div class="logo">
                    <img src="youtube.png" alt="">
                </div> 
                <div class="title-view">
                    <p class="title">${videolist.snippet.title}</p>
                      <p class="channel-name">${videolist.snippet.channelTitle}</p>
                     <div class="view">${videolist.videoStats ? formatVeiw(videolist.videoStats.viewCount) + ' VIEW' : 'NA'}</div>;
                </div>
            </div>
         `;

        videoElement.innerHTML = videoChildren;
       container.append(videoElement);
    }
}


// const videoId = "${}";

// async function fetchViewCount() {
//   const endpoint = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`;

//   try {
//     const response = await fetch(endpoint);
//     const data = await response.json();
    
//     if (data.items.length > 0) {
//       const viewCount = data.items[0].statistics.viewCount;
//       console.log("View Count:", viewCount);
//     } else {
//       console.log("Video not found");
//     }
//   } catch (error) {
//     console.log("Error:", error);
//   }
// }

// fetchViewCount();

async function fetchStats(videoId){
    // console.log(videoId);
    // const endPoint = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoId}&key=${apiKey}`;
    const endPoint = `https://www.googleapis.com/youtube/v3/videos?&part=statistics,contentDetails&id=${videoId}&key=${apiKey}`;
   try{
          let response = await fetch(endPoint);
          let data = await response.json();
        //   console.log(data);
        return data;
   }
   catch(error){
    alert("something wrong happen "+ error);
   }

}