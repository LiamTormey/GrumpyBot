const getQuoteAmount = (str) => { 
    if(!str) return []
    let quoteMarks = 0

    for(let i = 0; i < str.length; i++) { 
        if(str[i] != '"') { continue; }
        if(str[i-1] == "\\") { continue;  }
        quoteMarks++ 
    }

    return quoteMarks;
}


const tokenize = (str) => {
    
    //make sure theres an even amount of quotes 
    if(getQuoteAmount(str) % 2 != 0) { 
        throw new Error("Uneven amount of quotes.");
    }

    //tokenize with quotes 
    let token = "";
    let mode = "char"
    let tokens = [] 
    for(let i = 0 ; i < str.length; i++) { 
        let char = str[i]; 
        let escaped = str[i-1] == "\\"
        let isQuote = char == "\""
        let isSpace = char == " "; 

        if(isSpace && mode == "char") { 
            tokens.push(token) 
            token = ""
        }
        else if(isQuote && !escaped) { 
            let newMode = "quote";
            if(mode == "quote") { 
                newMode = "char"
            }
            tokens.push(token) 
            token = "" 
            mode = newMode
        }
        else if(escaped && isQuote) { 
            token += char 
        } else { 
            token += char; 
        }
    }
    tokens.push(token)
    token = "" 
    tokens = tokens.filter( t => t != "")
    return tokens 
}

module.exports.tokenize = tokenize