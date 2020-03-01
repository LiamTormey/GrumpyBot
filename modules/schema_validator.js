const validate = (tokens, schema, exec) => { 
    if(!tokens) {throw new Error("No tokens supplied to the validate schema function")}
    if(!schema) {throw new Error("No schema supplied to the validate schena function")}
    if(!Array.isArray(tokens)) {throw new Error("Invalid type supplied as the tokens for the validate schema function")}
    if(!Array.isArray(schema)) {throw new Error("Invalid type supplied as the schema for the validate schema function")}

    const required = schema.filter( v => !v.optional)
    const optional = schema.filter( v => v.optional)
    if(required.length > tokens.length) {throw new Error(`Length of required schema fields(${required.length}) is greater then the token size(${tokens.length});`)}
    
    let mapped = {}

    

    let i = 0
    for(i = 0; i < required.length; i++) { 
        const token = tokens[i] 
        const schema = required[i]
        validateTokenAgainstSchema(token, schema)
        if(schema.id) { 
            mapped[schema.id] = token 
        }
    }


    for(i = i; i < tokens.length; i++) { 
        const token = tokens[i] 
        const schema = optional[i - required.length]
        validateTokenAgainstSchema(token, schema)
        if(schema.id) { 
            mapped[schema.id] = token 
        }
    }

    if(exec) { 
        exec(mapped, tokens)
    }
    return mapped; 

}


const validateTokenAgainstSchema = (token, schema) => { 
    console.log(token, schema)
    if(!validateTokenAgainstType(token, schema.type)) {
        console.log(1)
        throw new Error(`Invalid type for token "${token}"; Expected a ${typeof(schema.type(token))}`)
    }
    if(schema.allow) { 
        if(Array.isArray(schema.allow)) { 
            const allowed = schema.allow.map( (v) => v.toLowerCase())
            if(!allowed.includes(token.toLowerCase())) { 
                console.log(2)
                throw new Error(`The token '${token}' is not a valid type (${allowed})`)
            }
        }
        else if(!schema.allow(token)) { 
            console.log(3)
            throw new Error(`The token '${token}' does not meet validation measures.`)
        }
    }
    console.log(4)
}
const validateTokenAgainstType = (token, type) => { 
    if(!type) {throw new Error("Invalid type supplied to validateTokenAgainstType function")}
    if(!token) {throw new Error("No token supplied to validateTokenAgainstType function")}
    if(type == String) { 
        if(validateNumber(token)) return false; 
        return true; 
    }
    if(type == Number) { 
        if(validateNumber(token)) return true; 
    }
    if(type == Boolean) { 
        const parsed = String(token) 
        if(parsed.toLowerCase() === "true") return true 
        if(parsed.toLowerCase() === "false") return true  
    }
    return false; 
}
const validateNumber = (v) => {
    try { 
        v = Number(v); 
    } catch(e) {return false}
    console.log("e", v)
    return (v !== undefined && !isNaN(v) && v !== null) 
}

module.exports.validate = validate
