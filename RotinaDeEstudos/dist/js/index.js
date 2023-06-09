"use strict";
const inputContent = window.document.getElementById("inputContent");
const inputHours = window.document.getElementById("inputHours");
const optionDifficulty = window.document.getElementsByClassName("optionDifficulty");
const checkDays = window.document.getElementsByClassName("checksDays");
const selectContents = window.document.getElementById("selectContents");
const divResult = window.document.getElementsByClassName("result")[0];
let contents = [];
let difficultiesNumber = [];
let difficultiesString = [];
let difficultiesColor = [];
function addContent() {
    if (verifyInputContent() && verifySelectDifficulty()) {
        if (verifyLastContent(inputContent.value)) {
            divResult.innerHTML = "<h2>Resultado:</h2> <br>";
            const content = inputContent.value;
            const difficultyNumber = verifyOptionDifficult()[0];
            const difficultyString = verifyOptionDifficult()[1];
            const difficultyColor = verifyDifficultyColor(difficultyNumber);
            contents.push(content);
            difficultiesNumber.push(difficultyNumber);
            difficultiesString.push(difficultyString);
            difficultiesColor.push(difficultyColor);
            const option = window.document.createElement("option");
            option.style.color = difficultyColor;
            option.text = `${content}, ${difficultyString}`;
            selectContents.appendChild(option);
        }
        else {
            window.alert("Conteúdo já adicionada à lista. Adicione outro!");
        }
    }
    else {
        window.alert("Complete os campos corretamente.");
    }
    inputContent.value = "";
}
function removeLastContent() {
    divResult.innerHTML = "<h2>Resultado:</h2> <br>";
    selectContents.remove(contents.length - 1);
    contents.pop();
    difficultiesNumber.pop();
    difficultiesString.pop();
    difficultiesColor.pop();
}
function clearContents() {
    divResult.innerHTML = "<h2>Resultado:</h2> <br>";
    selectContents.innerHTML = "";
    contents = [];
    difficultiesNumber = [];
    difficultiesString = [];
    difficultiesColor = [];
}
function fSubmit() {
    if (verifyListContents()) {
        divResult.innerHTML = "<h2>Resultado:</h2> <br>";
        if (verifyInputHours() && verifyDays()) {
            const hours = Number(inputHours.value);
            const days = verifyDaysCheckeds();
            const difficultyTotal = sumDifficulties();
            const hoursPerContent = hours * days / difficultyTotal;
            for (let i = 0; i <= contents.length - 1; i++) {
                if (((hoursPerContent * difficultiesNumber[i]).toFixed().replace(/\.?0+$/, "")) === "1") {
                    divResult.innerHTML += `<li><span style="color:${difficultiesColor[i]}">${contents[i]}</span> - ${(hoursPerContent * difficultiesNumber[i]).toFixed().replace(/\.?0+$/, "")} hora durante a rotina</li>`;
                }
                else if (((hoursPerContent * difficultiesNumber[i]).toFixed().replace(/\.?0+$/, "")) === "") {
                    divResult.innerHTML += `<li><span style="color:${difficultiesColor[i]}">${contents[i]}</span> - nenhuma hora durante a rotina</li>`;
                }
                else {
                    divResult.innerHTML += `<li><span style="color:${difficultiesColor[i]}">${contents[i]}</span> - ${(hoursPerContent * difficultiesNumber[i]).toFixed().replace(/\.?0+$/, "")} horas durante a rotina</li>`;
                }
            }
        }
        else {
            window.alert("Complete os campos corretamente.");
        }
    }
    else {
        window.alert("Não há nenhum conteúdo na sua lista!");
    }
}
function verifyInputContent() {
    return !!(inputContent.value.length);
}
function verifySelectDifficulty() {
    return !!(optionDifficulty[0].selected || optionDifficulty[1].selected || optionDifficulty[2].selected || optionDifficulty[3].selected || optionDifficulty[4].selected);
}
function verifyLastContent(content) {
    return contents.indexOf(content) === -1;
}
function verifyOptionDifficult() {
    if (optionDifficulty[0].selected) {
        return [1, "Ótimo"];
    }
    else if (optionDifficulty[1].selected) {
        return [2, "Bom"];
    }
    else if (optionDifficulty[2].selected) {
        return [3, "Razoável"];
    }
    else if (optionDifficulty[3].selected) {
        return [4, "Ruim"];
    }
    else if (optionDifficulty[4].selected) {
        return [5, "Péssimo"];
    }
    else {
        return [0, "ERRO"];
    }
}
function verifyDifficultyColor(difficultyNumber) {
    switch (difficultyNumber) {
        case 1:
            return "rgb(64, 64, 255)";
        case 2:
            return "rgb(64, 255, 64)";
        case 3:
            return "rgb(218, 218, 18)";
        case 4:
            return "rgb(246, 154, 7)";
        case 5:
            return "rgb(223, 44, 44)";
        default:
            return "black";
    }
}
function verifyListContents() {
    return !!(contents.length !== 0);
}
function verifyInputHours() {
    return !!(inputHours.value.length && Number(inputHours.value) >= 1 && Number(inputHours.value) <= 12);
}
function sumDifficulties() {
    let sum = 0;
    for (let i = 0; i < difficultiesNumber.length; i++) {
        sum += difficultiesNumber[i];
    }
    return sum;
}
function verifyDays() {
    return (checkDays[0].checked || checkDays[1].checked || checkDays[2].checked || checkDays[3].checked || checkDays[4].checked || checkDays[5].checked || checkDays[6].checked);
}
function verifyDaysCheckeds() {
    let sum = 0;
    for (let i = 0; i <= checkDays.length - 1; i++) {
        if (checkDays[i].checked) {
            sum++;
        }
    }
    return sum;
}
