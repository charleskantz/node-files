/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {

    //loop through word array

    //using map instead of object!!!
    let chainObj = new Map();
    for (let i = 0; i < this.words.length; i++) {
      if (chainObj[this.words[i]]) {
        chainObj[this.words[i]].push(this.words[i + 1] || null);
      }
      else {
        chainObj[this.words[i]] = [this.words[i + 1] || null];
      }

    }
    // console.log("this is our object in makechains", chainObj)
    this.chains = chainObj;
  }
//===================================================================
//OUR FAILED ATTEMPT
//   makeText(numWords = 100) {
   
//     let textArray = [];
//     let chainObj = this.makeChains();
//     // console.log("this is our  text  array", textArray);


//    for (let i= 0; i < numWords; i++) {
//     let currentValueofKey = textArray[i]
//     let valueLength = chainObj[currentValueofKey];
//     console.log("this is valuelength", valueLength)
//     // let randomNum = Math.floor(Math.random() * valueLength -1);
//     // textArray.push(chainObj[textArray[i]][randomNum])

//    }

//     return textArray.join(" ") + ".";
//   }
// }
//===================================================================


/** Pick random choice from array */

static choice(ar) {
  return ar[Math.floor(Math.random() * ar.length)];
}

/** return random text from chains */

makeText(numWords = 100) {
  // pick a random key to begin
  let keys = Array.from(this.chains.keys());
  let key = MarkovMachine.choice(keys);
  let out = [];

  // produce markov chain until reaching termination word
  while (out.length < numWords && key !== null) {
    out.push(key);
    key = MarkovMachine.choice(this.chains.get(key));
  }

  return out.join(" ");
}
}

let mm = new MarkovMachine("the cat in the hat");

mm.makeText(numWords = 20);