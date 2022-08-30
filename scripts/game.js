const PAGE_WORD_COUNT = 10000

export async function getAllWords(){
    let words;
    await $.getJSON("./dictionary/2.json",((data) => {
        words=data;
    }));
    return words;
}

export async function getRandWord(words, IDList){
    let word;
    do {
        const randNumber = Math.floor(Math.random()*18350);
        const page = 2;
        word = words[randNumber];
        
    } while (IDList.includes(word.id)); 

    return word;

}

// export function calcScore(word){
//     const scoreList = {
//         97:1,
//         98:3,
//         99:4,
//         231:4,
//         100:3,
//         101:1,
//         102:7,
//         103:5,
//         287:8,
//         104:5,
//         305:2,
//         105:1,
//         106:10,
//         107:1,
//         108:1,
//         109:2,
//         110:1,
//         111:2,
//         246:7,
//         112:5,
//         114:1,
//         115:2,
//         351:4,
//         116:1,
//         117:2,
//         252:3,
//         118:7,
//         121:3,
//         122:4,
//     }
//     let score = 0;
//     word.split(" ").join("").toLocaleLowerCase().split("").forEach((element)=>{
//         score += scoreList[element.charCodeAt(0)]||1;
//         console.log(element+": "+score);
//     });
//     console.log("total"+score);
//     return score;
// }

export function calcScore(){
    
}
