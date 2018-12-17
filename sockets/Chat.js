var request = require('request');

module.exports = (io) => {
    io.on('connection', function (socket) {

        let ip;

        request('https://api.ipify.org?format=json	', { json: true }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                io.emit('chat message', {
                    'message': 'User connected with @ip: ' + body.ip,
                    'username' : 'Console'
                });

                socket.join(body.ip);
                ip = body.ip;
            }
        })

        socket.on('chat message', function (data) {
            io.to(ip).emit('chat message', data);
        });
    });
};