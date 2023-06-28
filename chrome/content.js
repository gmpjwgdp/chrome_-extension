// create elements
let input = document.createElement("input");
input.type = "text";
input.style.width = "100%";
input.style.height = "20px";
input.style.minHeight = "20px";
input.style.fontSize = "12px";
input.style.border = "none";
input.style.outline = "none";
input.style.backgroundColor = "transparent";
input.style.boxShadow = "none";
input.style.margin = "0";
input.style.padding = "0";

let sendImg = document.createElement("img");
sendImg.src = chrome.runtime.getURL("/images/send.svg");

let sendButton = document.createElement("button");
sendButton.style.display = "flex";
sendButton.style.justifyContent = "center";
sendButton.style.alignItems = "center";
sendButton.style.border = "none";
sendButton.style.outline = "none";
sendButton.style.backgroundColor = "transparent";
sendButton.style.cursor = "pointer";
sendButton.style.margin = "0";
sendButton.style.marginLeft = "2px";
sendButton.style.padding = "0";
sendButton.style.minWidth = "24px";

let inputWrapper = document.createElement("div");
inputWrapper.style.display = "flex";
inputWrapper.style.alignItems = "center";
inputWrapper.style.backgroundColor = "white";
inputWrapper.style.margin = "2px";
inputWrapper.style.marginBottom = "0";
inputWrapper.style.padding = "4px";
inputWrapper.style.borderRadius = "6px";
inputWrapper.style.boxShadow = "0 0 4px 0 rgba(0, 0, 0, 0.2)";
inputWrapper.style.border = "2px solid #e6e6e6";
inputWrapper.style.pointerEvents = "auto";

let dogDisplay = document.createElement("div");
dogDisplay.style.fontSize = "16px";
dogDisplay.style.display = "flex";
dogDisplay.style.alignItems = "center";
dogDisplay.style.backgroundColor = "white";
dogDisplay.style.margin = "2px";
dogDisplay.style.padding = "4px";
dogDisplay.style.borderRadius = "6px";
dogDisplay.style.boxShadow = "0 0 4px 0 rgba(0, 0, 0, 0.2)";
dogDisplay.style.border = "2px solid #e6e6e6";
dogDisplay.style.overflow = "hidden";

let dogText = document.createElement("div");
dogText.style.whiteSpace = "nowrap";
dogText.style.height = "20px";
dogText.style.lineHeight = "20px";
dogText.style.fontSize = "12px";
dogText.style.margin = "0";
dogText.style.padding = "0";
dogText.style.backgroundColor = "transparent";

let textWrapper = document.createElement("div");
textWrapper.style.display = "flex";
textWrapper.style.flexDirection = "column";
textWrapper.style.justifyContent = "flex-end";
textWrapper.style.width = "100%";
textWrapper.style.height = "100%";
textWrapper.style.backgroundColor = "transparent";

let dogImg = document.createElement("img");
dogImg.src = chrome.runtime.getURL("/images/sleeping-corgi.png");
dogImg.style.width = "100%";
dogImg.style.height = "70%";
dogImg.style.objectFit = "left";
dogImg.style.position = "absolute";
dogImg.style.zIndex = "-10";
dogImg.style.pointerEvents = "none";

let positionButtonImg = document.createElement("img");
positionButtonImg.src = chrome.runtime.getURL("/images/down.svg");
positionButtonImg.style.width = "100%";
positionButtonImg.style.height = "100%";
positionButtonImg.style.objectFit = "cover";
positionButtonImg.style.transition = "0.5s";

let silentButtonImg = document.createElement("img");
silentButtonImg.src = chrome.runtime.getURL("/images/arrow.svg");
silentButtonImg.style.width = "100%";
silentButtonImg.style.height = "100%";
silentButtonImg.style.objectFit = "cover";
silentButtonImg.style.transition = "0.5s";

let positionButton = document.createElement("button");
positionButton.style.border = "none";
positionButton.style.outline = "none";
positionButton.style.backgroundColor = "rgba(0,0,0,0.5)";
positionButton.style.borderRadius = "50%";
positionButton.style.cursor = "pointer";
positionButton.style.margin = "0";
positionButton.style.padding = "0";
positionButton.style.width = "30px";
positionButton.style.minWidth = "30px";
positionButton.style.height = "30px";
positionButton.style.minHeight = "30px";
positionButton.style.position = "absolute";
positionButton.style.top = "0";
positionButton.style.right = "0";
positionButton.style.margin = "4px";
positionButton.style.pointerEvents = "auto";

let silentButton = document.createElement("button");
silentButton.style.border = "none";
silentButton.style.outline = "none";
silentButton.style.backgroundColor = "rgba(0,0,0,0.5)";
silentButton.style.borderRadius = "50%";
silentButton.style.cursor = "pointer";
silentButton.style.margin = "0";
silentButton.style.padding = "0";
silentButton.style.width = "30px";
silentButton.style.minWidth = "30px";
silentButton.style.height = "30px";
silentButton.style.minHeight = "30px";
silentButton.style.position = "absolute";
silentButton.style.top = "0";
silentButton.style.left = "0";
silentButton.style.margin = "4px";
silentButton.style.pointerEvents = "auto";

let container = document.createElement("div");
container.style.position = "fixed";
container.style.bottom = "0";
container.style.right = "0";
container.style.zIndex = "9999";
container.style.width = "200px";
container.style.height = "230px";
container.style.pointerEvents = "none";
container.style.fontFamily = "sans-serif";
container.style.margin = "0";
container.style.backgroundColor = "white";

// append child elements
sendButton.appendChild(sendImg);

inputWrapper.appendChild(input);
inputWrapper.appendChild(sendButton);

positionButton.appendChild(positionButtonImg);
silentButton.appendChild(silentButtonImg);

dogDisplay.appendChild(dogText);

textWrapper.appendChild(dogDisplay);
textWrapper.appendChild(inputWrapper);

container.appendChild(dogImg);
container.appendChild(textWrapper);
container.appendChild(positionButton);
container.appendChild(silentButton);

// add event listeners
sendButton.addEventListener("click", () => {
  let inputText = input.value;
  if (inputText) {
    sendToChatGPT(inputText);
  } else {
    sendToChatGPT("The user is browsing the following page. Make some intimate comments about it\n", document.body.innerText.slice(0, 500));
  }
});

positionButton.addEventListener("click", () => {
  chrome.storage.local.get(["atTop"], (result) => {
    if (result.atTop) {
      toDown();
    } else {
      toTop();
    }
    chrome.storage.local.set({ atTop: !result.atTop });
  });
});

silentButton.addEventListener("click", () => {
  chrome.storage.local.get(["silent"]).then((result) =>  {
    chrome.storage.local.set({ silent: !result.silent }).then(()=>{
      if(result.silent){
        startLoop();
      }else if(!result.silent){
        stopLoop();
      }
      setDogText();
    });
  });
});

// define functions
function sendToChatGPT(inputText, documentText) {
  dogText.style.animation = "none";
  dogText.style.paddingLeft = "0";
  dogText.innerText = "（考え中……）";

  chrome.storage.local.get(["history"], (result) => {
    let history = result.history ?? [];

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.openai.com/v1/chat/completions", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "<公開用にAPIキー消去>");
    xhr.send(
      JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          ...history,
          {
            role: "user",
            content: inputText + "The browsed page:\n" + documentText + "\n日本語で答えて\n語尾にワンを付けて\n犬の真似をして",
          },
        ],
      })
    );
    xhr.onreadystatechange = function () {
      //console.log(xhr.response);
      if (xhr.readyState == 4 && xhr.status == 200) {
        let response = JSON.parse(xhr.responseText);
        let answer = response.choices[0].message.content.replace(/\r?\n/g, "");
        //console.log(answer);
        let answerText = answer;
        dogText.innerText = answerText;
        console.log(answerText);
        let length = answerText.length;
        if (length > 15) {
          dogText.style.animation = `scroll ${length / 5}s linear infinite`;
          dogText.style.paddingLeft = "100%";
        } else {
          dogText.style.paddingLeft = "0%";
        }
        input.value = "";

        if (history.length > 30) {
          history = history.slice(history.length - 30, history.length);
        }
        chrome.storage.local.set({
          history: [...history, { role: "user", content: inputText }, { role: "assistant", content: answer }],
        });
        chrome.storage.local.set({ silent: false });
        startLoop()
      }
    };
    return true;
  });
}

function toTop() {
  container.style.top = "0";
  container.style.bottom = "auto";
  positionButtonImg.src = chrome.runtime.getURL("/images/down.svg");
}

function toDown() {
  container.style.top = "auto";
  container.style.bottom = "0";
  positionButtonImg.src = chrome.runtime.getURL("/images/up.svg");
}

function startLoop(){
  silentButtonImg.src = chrome.runtime.getURL("/images/pause.svg");
  dogImg.src = chrome.runtime.getURL("/images/corgi-with-shades.jpg");
}

function stopLoop(){
  silentButtonImg.src = chrome.runtime.getURL("/images/arrow.svg");
  dogImg.src = chrome.runtime.getURL("/images/sleeping-corgi.png");
}

function onLoadInit() {
  chrome.storage.local.get(["visible"], (result) => {
    if (result.visible === undefined) {
      chrome.storage.local.set({
        visible: true,
      });
    } else {
      if (result.visible) {
        document.body.appendChild(container);
      }
    }
  });

  chrome.runtime.onMessage.addListener(function (msg) {
    if (msg.visible) {
      document.body.appendChild(container);
    } else {
      document.body.removeChild(container);
    }
  });

  chrome.storage.local.get(["atTop","silent","history"], (result) => {
    if (result.atTop === undefined) {
      chrome.storage.local.set({ atTop: false });
    }
    if (result.atTop || result.atTop === undefined) {
      toTop();
    } else {
      toDown();
    }

    if (result.silent === undefined) {
      chrome.storage.local.set({ silent: true });
    }
    else if(result.silent){
      stopLoop()
    }else if(!result.silent){
      startLoop()
    }

    if (!result.history) {
      dogText.innerText = "ウェルシュ・コーギー";
      return;
    }
  });
}

function setDogText() {
  chrome.storage.local.get(["history","silent"], (result) => {
    console.log(result)
    if(!result.silent){
      if (!result.history) {
        dogText.innerText = "ウェルシュ・コーギー";
        return;
      }
  
      let lastChat = result.history[result.history.length - 1];
      while (lastChat.role !== "assistant" && result.history.length > 0) {
        lastChat = result.history[result.history.length - 1];
        result.history.pop();
      }
      let lastText = lastChat.content;
      dogText.innerText = lastText;
  
      let length = lastText.length;
      if (length > 15) {
        dogText.style.paddingLeft = "100%";
        dogText.style.animation = `scroll ${length / 5}s linear infinite`;
      }
    }else{
      dogText.innerText =""
    }
  });
};

// passive events
window.onfocus = function(){
  onLoadInit();
  setDogText()
}

onLoadInit();

// window.onload = function () {
//   sendToChatGPT("The user is browsing the following page. Make some intimate comments about it\n", document.body.innerText.slice(0, 500));
// };

// setInterval(() => {
//   sendToChatGPT("The user is browsing the following page. Make some intimate comments about it\n", document.body.innerText.slice(0, 500));
// }, 5 * 60 * 1000);
