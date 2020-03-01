module.exports = [
    {
        id:'command',
        type: String, 
        allow: ['set']
    },
    {
        type: String, 
        allow: ['chance']
    },
    {
        id: 'chance', 
        type: String,
        allow: (s) => {
            if(!s.endsWith("%")) return false; 
            try { 
                let n = Number(s.replace("%", ""))
                if(n > 100 || n < 0) { throw new Error("out of bounds") }
            } catch(e) { 
                return false; 
            }
            return true; 
        }
    }
]