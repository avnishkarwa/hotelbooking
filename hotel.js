
const initialLoginId = "123";
const initialPassword = "456";


const blocks = Array(10).fill({
    color: 'white', 
    person1: '',
    person2: '',
    marked: false,
    room: '',
    clickCount: 0, 
});


function validateLogin() {
    const loginId = document.getElementById("loginId").value;
    const password = document.getElementById("password").value;

    if (loginId === initialLoginId && password === initialPassword) {
        
        document.getElementById("loginPage").style.display = "none";
        
        document.getElementById("blocksPage").style.display = "block";
        
        showPage2();
        return "Login successful!";
    } else {
        return "Login failed. Please check your credentials.";
    }
}


function showPage2() {
    const blocksContainer = document.getElementById("blocksContainer");
    blocksContainer.innerHTML = ''; 
    for (let i = 0; i < blocks.length; i++) {
        const roomNumber = i + 1; 
        const block = blocks[i];
        const blockDiv = document.createElement("div");
        blockDiv.className = "block";
        blockDiv.dataset.index = i;
        blockDiv.textContent = `Room ${roomNumber}`;

        
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => removeDetailsFromRoom(i, roomNumber));
        blockDiv.appendChild(removeButton);

        if (block.marked) {
            blockDiv.style.backgroundColor = 'yellow';
        }

        blockDiv.addEventListener("click", () => handleBlockClick(i, roomNumber));

        blocksContainer.appendChild(blockDiv);
    }
}



function removeDetailsFromRoom(index, roomNumber) {
    const block = blocks[index];
    block.person1 = '';
    block.person2 = '';

    const blockDiv = document.querySelector(`[data-index="${index}"]`);
    blockDiv.textContent = `Room ${roomNumber}`;
}





function handleBlockClick(index, roomNumber) {
    const block = blocks[index];
    const blockDiv = document.querySelector(`[data-index="${index}"]`);

    if (block.clickCount >= 4) {
        
        block.marked = false;
        block.person1 = '';
        block.person2 = '';
        block.clickCount = 0;
        blockDiv.style.backgroundColor = 'white';
        blockDiv.textContent = `Room ${roomNumber}`;
    } else {
        if (block.marked) {
            block.marked = false;
            blockDiv.style.backgroundColor = 'white';
            block.clickCount = 0;
        } else {
            block.marked = true;
            blockDiv.style.backgroundColor = 'yellow';
            addDetailsToRoom(index, roomNumber);
        }
    }

    block.clickCount++;
}


function addDetailsToRoom(index, roomNumber) {
    const block = blocks[index];
    const person1 = prompt("Enter name of person 1:");
    const person2 = prompt("Enter name of person 2:");

    block.person1 = person1 || '';
    block.person2 = person2 || '';

    if (block.person1 || block.person2) {
        const blockDiv = document.querySelector(`[data-index="${index}"]`);
        blockDiv.textContent = `Room ${roomNumber}\n${block.person1}\n${block.person2}`;
    }
}
