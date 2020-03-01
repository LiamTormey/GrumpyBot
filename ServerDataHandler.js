const fs = require('fs')
const path = require('path')

class ModuleDataHandler { 

    constructor() { 

    }

    serverObjectExists(id) { 
        if(!id) return; 
        let promise = new Promise((resolve, reject) => {
            const file_path = path.join(__dirname, `servers`,`${id}.json`)
            try { 
                fs.exists(file_path, (exists)=>{resolve(exists)})
            } catch (e) { 
                reject(e)
            }
        }); 
        return promise; 
    }

    getServerObject(id) { 
        let promise = new Promise((res, rej) => {
            const file_path = path.join(__dirname, `servers`,`${id}.json`)
            fs.readFile(file_path, (err, data)=>{
                if(err !== null) {rej(err)}
                if(data) {
                    res(JSON.parse(String(data)))
                }
            })
        })
        return promise; 
    }

    setServerObject(id, obj) { 
        let promise = new Promise( (resolve, reject) => {
            const file_path = path.join(__dirname, `servers`,`${id}.json`)
            fs.writeFile(file_path, JSON.stringify(obj), {}, (err)=>{
                if(err) reject(err) 
                resolve(file_path)
            })
        }); 
        return promise; 
    }

    async add(id, arrayName, value) { 
        let obj = {}
        try { 
            obj = await this.getServerObject(id) 
        } catch(e) {console.log('[error] Error with finding server file', e)}
        
        if(!obj[arrayName]) obj[arrayName] = [] 
        obj[arrayName].push(value) 
        const path = await this.setServerObject(id, obj) 
        if(path) { 
            return true; 
        } else { 
            throw new Error("could not save ");  
        }
    }

    async set(id, key, value) { 
        let obj = {}
        try { 
            obj = await this.getServerObject(id) 
        } catch(e) {console.log('Error with finding server', e)}
        obj[key] = value 
        const path = await this.setServerObject(id, obj) 
        if(path) { 
            return true; 
        } else { 
            return false; 
        }
    }

}

module.exports = new ModuleDataHandler