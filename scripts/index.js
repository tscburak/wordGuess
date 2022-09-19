
import { getRandWord, getAllWords } from './game.js';

var word;
var score = 0;
var words;
var IDList = [];

$(document).ready(async function(){
    words = await getAllWords();
});

$("#start").click(async function(){
    $("#bottombox").html(' <div class = oneline>'+
    '<input type="text" class="text-center me-2" id="answerbox"/>'+
    '<input type="button" class = "text-center" id = "submitanswer" value="=>"/>'+
    '</div>'+
    '<div class="pt-3 oneline">'+
    '<input style="font-size-adjust: 2vw;" type="button" class = "text-center me-3" id = "askagain" value="Pas"/>'+
    '<input type="button" class = "text-center" id = "showanswer" value="İpucu"/>'+
    '</div>')
    newQuestion();

    $("#showanswer").click(async function(){
        console.log("fs");
        $("#answerbox").val(word.word);
    })
    
    $("#askagain").click(async function(){
        console.log("askagain");
    })

    $("#submitanswer").click(async function(){
        if($("#answerbox").val() == word.word){
            score += word.score;
            $("#score").attr("class",`d inline-flex display-${score.toString().length} pe-1 ps-1`)
            $("#score").text(`${score}`)
            IDList.push(word.id);
            await $("#askagain").click();
            newQuestion();
        }else{
            $("#answerbox").val("");
        }
    
    })

})


async function newQuestion(){
    word = await getRandWord(words, IDList);
    const wordCount = word.word.split(" ").length;
    const letterCount = word.word.split(" ").join("").length;
    let meanings = word.meanings.map((element, index)=>`${index+1 + ") " +element.meaning + "<br>"}`);
    $("#question").html(meanings.join("\n"));
    $("#answerbox").val("");
    $("#answerbox").attr("placeholder",wordCount + " kelime, " + letterCount + " harf");
}






