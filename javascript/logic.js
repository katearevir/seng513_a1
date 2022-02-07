// Code credits: this code was written by Dr. Pavol Federl for the SENG 513 course at the UofC
// https://codepen.io/pfederl/pen/JEMKwB


function getStats(txt) {
    //nChars
    let nChars = txt.length;

    //nWords
    function isLetter(x){
	    return x.toUpperCase() != x.toLowerCase();
    }

    //getWords
    let arr = txt.split(/\s/); //split by whitespace and place in array
    let wordsArr = [];
    let str = "";
    for (let word of arr) { //iterate through each word in array
        let cleantxt = word.replaceAll(/\W/g, ''); //take out any special characters
        str = "";
        if(/\d/.test(cleantxt)){ //if word contains a digit, go through word
            for (let i = 0; i < cleantxt.length-1; i++){
                let nextChar = cleantxt[i+1];
                
                if (isLetter(cleantxt[i])){
                    str += cleantxt[i];
                    if (!isLetter(nextChar))
                    {
                        wordsArr.push(str);
                        str = "";
                    }
                }
                
                else if (!isLetter(cleantxt[i])){
                    str += cleantxt[i];
      	            if (isLetter(nextChar))
                    {
                        wordsArr.push(str);
                        str = "";
                    }
      		    }
            }
            
            str += cleantxt[cleantxt.length-1]
            wordsArr.push(str);
        }
        else if (/\S/.test(cleantxt))
        {
            wordsArr.push(cleantxt);
        }
    }

    let nWords = 0;
    nWords = wordsArr.length;

    //nLines
    let lineArr = txt.split(/\r|\n/);
    let nLines = lineArr.length;
    if (lineArr.length == 1 && nChars == 0){
        nLines = 0;
    }

    //nNonEmptyLines
    //split by newline
    //test for any non-whitespace character in each line
    let nNonEmptyLines = 0;
    for (let line of lineArr){
        if (/\S/.test(line)){
            nNonEmptyLines++;
        }
    }

    //avgWordLength
    arr = txt.split(/\s/); //split by whitespace and place in array
    let avgWordLength = 0.0;
    
    for (let word of wordsArr){
        avgWordLength += word.length;
    }
    
    avgWordLength /= nWords;

    if (nWords == 0){
        avgWordLength = 0.0;
    }

    //maxLineLength
    let maxLineLength = 0;
    for (let line of lineArr){
        if (line.length > maxLineLength){
            maxLineLength = line.length;
        }
    }


    //tenLongestWords
    let sortedWords = wordsArr;
    sortedWords.sort(function(a, b) {
        if (a.length === b.length)
        {
            if (/\d/.test(a) && /\w/.test(b)) //if a is a number and b is a word
                return 1;
            else if (/\d/.test(b) && /\w/.test(a)) //if b is a number and a is a word
                return -1;
            else if (/\w/.test(a) && /\w/.test(b))
                return a.localeCompare(b);
        }
        else return b.length - a.length;
      });

    //remove duplicates
    //https://www.geeksforgeeks.org/how-to-remove-duplicate-elements-from-javascript-array/
    function removeDuplicates(arr) {
        return arr.filter((item, 
            index) => arr.indexOf(item) === index);
    }

    sortedWords = removeDuplicates(sortedWords);

    //get ten longest words
    let tenLongestWords = [];
    let j = 0;
    while (j < 10 && j < sortedWords.length){
        if (/\w/.test(sortedWords[j]))
            tenLongestWords.push(sortedWords[j].toLowerCase());
        else
            tenLongestWords.push(sortedWords);
        j++;
    }
    
    //tenMostFrequentWords
    
    //sort words alphabetically
    sortedWords = wordsArr.sort();

    //count words
    let currWord = sortedWords[0];
    let count = 0;
    let freqArray = [];
    for (let i = 0; i < sortedWords.length; i++){
        if (currWord === sortedWords[i])
            count++;
        else{
            freqArray.push([currWord, count]);
            currWord = sortedWords[i];
            count = 1;
        }
    }
    //for last word
    freqArray.push([currWord, count]);

    //sort array by the second element in descending order
    freqArray = freqArray.sort(function(a, b){
        if (a[1] === b[1])
        {
            if (/\d/.test(a[0]) && /\w/.test(b[0]))
                return 1;
            if (/\d/.test(b[0]) && /\w/.test(a[0]))
                return -1;
            else return a[0].localeCompare(b[0]);
        }
            
        return b[1] - a[1];
    });

    j = 0;
    let tenMostFrequentWords = [];
    //get ten most frequent words
    while (j < 10 && j < freqArray.length){
        tenMostFrequentWords.push(freqArray[j][0] + "(" + freqArray[j][1] + ")");
        j++;
    }

    if (nWords == 0)
        tenMostFrequentWords = [];

    return {
        nChars: nChars,                                                     
        nWords: nWords,
        nLines: nLines,
        nNonEmptyLines: nNonEmptyLines,
        averageWordLength: avgWordLength,
        maxLineLength: maxLineLength,
        tenLongestWords: tenLongestWords,
        tenMostFrequentWords: tenMostFrequentWords
    };

}
