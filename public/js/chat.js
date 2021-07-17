
function getCurrentTime(){
    const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    if(m<10) m = "0"+m;

    if(h < 12) return `${h}:${m}am`;
    else return `${h-12}:${m}pm`;
}

function addOppositeChat(userimg, username, content){
    let $target = document.getElementById("content");
    let currentTime = getCurrentTime();
    let message = `
        <div class="opposite-chat">
        <div class="opposite-img"></div>
        <div class="opposite-content">
            <p class="opposite-content-name">${username}</p>
            <p class="opposite-content-message">${content}</p>
        </div>
        <div class="opposite-content-timestamp">
            ${currentTime}
        </div>
        </div>
    
    `

    $target.innerHTML += message;
    $target.scrollTop = $target.scrollHeight;
}

function addMyChat(content){
    let $target = document.getElementById("content");
    let currentTime = getCurrentTime();
    let message = `
        <div class="my-chat">
        <div class="my-content-timestamp">
            ${currentTime}
        </div>
        <p class="my-content-message">${content}</p>
        </div>  
    `
    $target.innerHTML += message;
    $target.scrollTop = $target.scrollHeight;
}


   
