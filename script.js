const startBtn = document.getElementById('startBtn');
const resultDiv = document.getElementById('result');
let recognizing = false;

function copy() {
    let myArea = document.querySelector(".myArea");
    let text = document.getElementById("result");
    text.select();
    try {
        const successful = document.execCommand("copy");
        const message = successful ? 'Text copied to clipboard!' : 'Copying failed!';
        console.log(message);
        document.getElementById("copy-btn").style.display = "none";
        myArea.classList.add("active");
        // window.getSelection().removeAllRanges();  // figure out the mean of this line
        setTimeout(() => {
            document.getElementById("copy-btn").style.display = "block";
            myArea.classList.remove("active");
        }, 2000);
    } catch (err) {
        console.error('Unable to copy text: ', err);
    }

}

if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = function () {
        recognizing = true;
        startBtn.innerText = 'Stop Recording';
    };

    recognition.onresult = function (event) {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }

        resultDiv.innerHTML = finalTranscript;
    };

    recognition.onend = function () {
        recognizing = false;
        startBtn.innerText = 'Start Recording';
    };

    startBtn.onclick = function () {
        if (recognizing) {
            recognition.stop();
        } else {
            recognition.start();
        }
    };
} else {
    resultDiv.innerHTML = 'Your browser does not support speech recognition.';
}