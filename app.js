let boxes = document.querySelectorAll(".box");
let btn1 = document.querySelector("#reset-btn");
let btn2 = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let line = document.querySelector(".line");

let turn0 = true;

const winPatterns = [
    [0, 1, 2],  
    [3, 4, 5],  
    [6, 7, 8],  
    [0, 3, 6],  
    [1, 4, 7],  
    [2, 5, 8],  
    [0, 4, 8],  
    [2, 4, 6]   
];

const ResetGame = () => {
    turn0 = true;
    EnableBoxes();
    msgContainer.classList.add("hide");
    line.classList.add("hide"); 
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return;

        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        CheckWinner();
    });
});

const DisableBoxes = () => {
    boxes.forEach((box) => box.disabled = true);
};

const EnableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const ShowWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    DisableBoxes();
};

const CheckWinner = () => {
    for (let i = 0; i < winPatterns.length; i++) {
        let pattern = winPatterns[i];
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                drawWinningLine(i);
                ShowWinner(pos1);
            }
        }
    }
};

const drawWinningLine = (index) => {
    line.classList.remove("hide");

    const positions = [
        { top: "16.5%", left: "50%", rotate: "0deg" },   
        { top: "50%", left: "50%", rotate: "0deg" },    
        { top: "83.5%", left: "50%", rotate: "0deg" },    
        { top: "50%", left: "16.5%", rotate: "90deg" },   
        { top: "50%", left: "50%", rotate: "90deg" },    
        { top: "50%", left: "83.5%", rotate: "90deg" },   
        { top: "50%", left: "50%", rotate: "45deg" },     
        { top: "50%", left: "50%", rotate: "-45deg" },    
    ];

    const pos = positions[index];
    line.style.top = pos.top;
    line.style.left = pos.left;
    line.style.transform = `translate(-50%, -50%) rotate(${pos.rotate})`;
};

btn1.addEventListener("click", ResetGame);
btn2.addEventListener("click", ResetGame);
