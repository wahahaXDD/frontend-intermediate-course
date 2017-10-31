var httpRequest = new XMLHttpRequest();

httpRequest.addEventListener('load', getStreams);
httpRequest.open('GET', 'https://api.twitch.tv/kraken/streams/?limit=20&game=League%20of%20Legends');
httpRequest.setRequestHeader('Client-ID', 'k74137v71c42mygd9z1wbpc2hne3vq');
httpRequest.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
httpRequest.send();

function getStreams() {
    var StreamList = JSON.parse(httpRequest.responseText);
    var container = document.getElementsByClassName("container");
    // console.log(StreamList.streams[0].preview.medium);
    // StreamList.streams[i].channel.logo => 大頭貼
    // StreamList.streams[i].preview => 頻道預覽
    // StreamList.streams[i].channel.description => 頻道描述
    // StreamList.streams[i].channel.display_name => 頻道名稱
//  <div class='col'>
//     <img src="404_preview-320x180.jpg" class='preview'/>
//     <div class="bottom">
//       <img src="404_preview-300x300.png" class="host_preview"/>
//       <div class='describe'>
//         <p class="channel_name">頻道名稱</p>
//         <p class="host_name">實況主名稱</p>
//       </div>
//     </div>
//   </div>
    
    for(let row=0; row<6; row++){
        var r =document.createElement("div");
        r.classList.add("row");
        for(let column=0; column<3; column++){
            var col = document.createElement("div");
            col.classList.add("col");
            var img_channel = document.createElement("img");
            img_channel.setAttribute("src", StreamList.streams[row*3+column].preview.medium);
            img_channel.classList.add("preview");
            var bottom = document.createElement("div");
            bottom.classList.add("bottom");
            var img_host = document.createElement("img");
            img_host.setAttribute("src", StreamList.streams[row*3+column].channel.logo);
            img_host.classList.add("host_preview");
            var describe = document.createElement("div");
            describe.classList.add("describe");
            var p_channel = document.createElement("p");
            p_channel.innerHTML = StreamList.streams[row*3+column].channel.description;
            p_channel.classList.add("channel_name");
            var p_host = document.createElement("p");
            p_host.innerHTML = StreamList.streams[row*3+column].channel.display_name;
            p_host.classList.add("host_name");
            describe.appendChild(p_channel);
            describe.appendChild(p_host);
            bottom.appendChild(img_host);
            bottom.appendChild(describe);
            col.appendChild(img_channel);
            col.appendChild(bottom);
            r.appendChild(col);
        }
        container[0].appendChild(r);
    }
}
