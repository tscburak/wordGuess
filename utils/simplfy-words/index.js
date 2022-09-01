const gts = require("./gts.json");
const fs = require('fs');

let words = [];
let count = 0;

function calcScore(word){
    const scoreList = {
        97:1,
        98:3,
        99:4,
        231:4,
        100:3,
        101:1,
        102:7,
        103:5,
        287:8,
        104:5,
        305:2,
        105:1,
        106:10,
        107:1,
        108:1,
        109:2,
        110:1,
        111:2,
        246:7,
        112:5,
        114:1,
        115:2,
        351:4,
        116:1,
        117:2,
        252:3,
        118:7,
        121:3,
        122:4,
    }
    let score = 0;
    word.split(" ").join("").toLocaleLowerCase().split("").forEach((element)=>{
        score += scoreList[element.charCodeAt(0)]||1;
    });
    return score;
}

function removeUnecessary(word){
    let listCopy = word.anlamlarListe||[];
    word.anlamlarListe = []
    // let meanings = Object.values(listCopy).map((record) =>{return {order: record.anlam_sira,meaning: record.anlam}});
    listCopy.forEach((element,index)=>{
        
        let elementWords = (element.meaning||"").toLocaleLowerCase().split(" ");

        if(!elementWords.includes(word.madde.split(" ")[0]) && !(elementWords.includes("ihtimali") && elementWords.includes("veya") && elementWords.includes("imkânı") && elementWords.includes("bulunmak") )){
            word.anlamlarListe.push({anlam_sira:index+1, anlam:element})
        }
    })
    return word;
}

gts.every((element, index, array) => {
    if(element != null){ 
       // element = removeUnecessary(element);
        if(element.madde.length>1 && (element.anlamlarListe || []).length > 1){
            count++;
            words = [...words,
                {
                    id: count,
                    word: element.madde,
                    score: calcScore(element.madde) ,
                    meanings: Object.values(element.anlamlarListe).map((record) =>{
                        return {order: record.anlam_sira,meaning: record.anlam}
                     })
                }]
        }

        if (words.length == 20000){
            fs.writeFile(`./dictionary/${Math.floor(count/10000)}.json`, JSON.stringify(words), err => {
                if (err) {
                  console.error(err);
                }});
            console.log(`${Math.floor(count/10000)}.json is done.`);
            words = [];
            console.log("words are truncated");
        }
        if(index + 1 == array.length){
            fs.writeFile(`./dictionary/${Math.ceil(count/10000)}.json`, JSON.stringify(words), err => {
                if (err) {
                  console.error(err);
                }});
            console.log(`${Math.ceil(count/10000)}.json is done.`);
        }
        
    }
return true
});


