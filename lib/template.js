const template = {
    HTML: ()=>`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>chatting</title>
            <link rel="stylesheet" href="./css/chat.css">
            <script type="text/javascript" src="./js/chat.js"></script>
        </head>
    
        <body>
            <div id="container" class="wrapper">
                <div id="header" class="menu-container">
                    <p>Chatting</p>
                </div>
    
                <div id="content" class="chat-container">
                    
                    <div class="opposite-chat">
                        <div class="opposite-img"></div>
                        <div class="opposite-content">
                            <p class="opposite-content-name">opposite</p>
                            <p class="opposite-content-message">oppositeoppositeoppositeoppositeoppositeoppositeoppositeoppositeoppositeoppositeoppositeoppositeoppositeoppositeoppositeoppositeoppositeopposite opposite</p>
                        </div>
                        <div class="opposite-content-timestamp">
                            3:33pm
                        </div>
    
                    </div>
    
                    <div class="my-chat">
                        <div class="my-content-timestamp">
                            3:33pm
                        </div>
                        <p class="my-content-message">hppositeoppositeoppositeoppositeoppositeoppositeoppositeoppositeoppositeoppositeoppositeoppositeoppositeoppositeoppositeoppositeoppositeoppositeoppositeoppositeo</p>
                    </div>                
                </div>
    
                <div id="footer" class="message-container">
                    <div class="chat-message-menu"></div>
                    <div class="chat-message">
                        <input id="message-input" class="chat-message-input" placeholder="input your message..."></input>
                    </div>
                </div>
            </div>
        </body>
    
        <script>
             document.getElementById("message-input").addEventListener("keypress", function(e){
            if(e.keyCode == 13 && this.value != ""){
                addMyChat(this.value);
                this.value = "";
            }});
        </script>
    </html>
    `


}

module.exports = template;