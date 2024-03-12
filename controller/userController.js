const User = require("../model/User")

const userController = (socket) => {
    socket.on('get|user', async ({ pageNo, pageSize }) => {
        try {
            let skipData = (Number(pageNo) - 1) * Number(pageSize);
            let paginationData = await User.find().skip(skipData).limit(pageSize)
            socket.emit('get|user', {
                success: true,
                data: paginationData,
                meassage: 'Data Retrived'
            })
        }
        catch (error) {
            socket.emit('get|user', {
                success: false,
                error: error.message
            })
        }
    })
    socket.on('add|user', async (req) => {
        try {
            const data = await User.create(req)
            socket.emit('add|user', {
                success: true,
                data: data,
                meassage: 'User Created Successfully'
            })
        }
        catch (error) {
            socket.emit('add|user', {
                success: false,
                error: error.message
            })
        }
    })
    socket.on('filter|user', async (req) => {
        try {
            const data = await User.aggregate([
                {
                    $addFields: { name: '' }
                }
            ])
            socket.emit('filter|user', {
                success: true,
                data: data,
                meassage: 'User filter Successfully'
            })
        }
        catch (error) {
            socket.emit('filter|user', {
                success: false,
                error: error.message
            })
        }
    })
}

module.exports = { userController }