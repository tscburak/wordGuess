
import { getRandWord, getAllWords } from './game.js';

let words;
let word;
let score = 0;
let IDList = [];

$(document).ready(async function(){
    $("#answerbox").focus();
    words = await getAllWords();
});

$("#askagain").click(async function(){
    word = await getRandWord(words, IDList);
    const wordCount = word.word.split(" ").length;
    const letterCount = word.word.split(" ").join("").length;
    let meanings = word.meanings.map((element, index)=>`${index+1 + ") " +element.meaning + "<br>"}`);
    $("#question").html(meanings.join("\n"));
    $("#answerbox").val("");
    $("#answerbox").attr("placeholder",wordCount + " kelime, " + letterCount + " harf");

})

$("#showanswer").click(async function(){
    $("#answerbox").val(word.word);
})

$("#submitanswer").click(async function(){
    if($("#answerbox").val() == word.word){
        console.log(word.word);
        score += word.score;
        $("#score").text(`${score}`)
        IDList.push(word.id);
        await $("#askagain").click();
    }else{
        $("#answerbox").val("");
    }

})






