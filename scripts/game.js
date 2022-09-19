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
        const randNumber = Math.floor(Math.random()*18349);
        const page = 2;
        word = words[randNumber];
        
    } while (IDList.includes(word.id)); 

    return word;

}


