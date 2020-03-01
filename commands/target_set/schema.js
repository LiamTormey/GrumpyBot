module.exports = [
    {
        id:'command',
        type: String, 
        allow: ['set']
    },
    {
        type: String, 
        allow: ['target']
    },
    {
        id:'channel',
        type: String,
        optional: true 
    }
    
]

const CustomTypes = {} 
const concept = [
    {
        id:'command',
        type: String, 
        allow: ['set']
    },
    {
        type: String, 
        allow: ['target']
    },
    {
        id:'channels',
        type: CustomTypes.Channel,
        optional: true,
        group: true,
        transform: (channel) => channel.split("<")[1].split("#")[0] 
    },
    {
        id: "capture", 
        type: CustomTypes.Any, 
        optional: true, 
        group: true, 
    }
    
]