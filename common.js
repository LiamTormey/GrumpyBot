module.exports.splitStringOnLengthLimit = (text, lim, delim) => { 
    if(text.length < lim) return [text]
    let arr = text.split('')
    let delimPositions = arr.map((char, i)=>char == delim ? i : undefined)
        .filter( (pos, i) => pos != undefined)
    let breaks = []
    let sub = 0
    for(let i = 0; i < delimPositions.length; i++) { 
        if( ( delimPositions[i] - sub) < lim && (delimPositions[i+1] - sub) > lim) { 
            breaks.push(delimPositions[i])
            sub = delimPositions[i]
            delimPositions = delimPositions.filter( (pos, j) => {
                if(j > i) { 
                } else { 
                    return false; 
                }
                return true; 
            })
            i = 0 
        }
        
    }
    if(breaks.length <= 0) return [text]

    let ret = [] 
    ret.push(text.substring(0, breaks[0]+1))
    breaks.forEach( (b, i) => {
        if(breaks[i+1]) { 
            ret.push(text.substring(b, breaks[i+1]+1))
        }
    })
    ret.push(text.substring(breaks[breaks.length-1]))
    return ret; 
}

module.exports.arrayJoin = (arr, seperator, maxLength) => { 
    let stringArray = [""] 
    
    for(let i = 0; i < arr.length; i++) { 
        let currentString = stringArray[stringArray.length - 1]
        if(currentString.length + arr[i].length < maxLength) { 
            stringArray[stringArray.length - 1] = (stringArray[stringArray.length - 1] + `${seperator}${arr[i]}`).trim()
        } else { 
            stringArray.push(arr[i])
        }
    }
    return stringArray
}

module.exports.arrayJoin(
    ["my", "name is liam", "and I like to eat", "because", "I do like", "to eat", "aha"],
    " ",
    20
)