const config = require('./config.js')
const CleverbotAPI = require('cleverbot-api');
const cleverbot = new CleverbotAPI(config.cbapikey);
const login = require("facebook-chat-api");

login({ email: config.fbemail, password: config.fbpassword }, (err, api) => {
    if (err) return console.error(err);

    api.listen((err, message) => {
        cleverbot.getReply({
            input: message.body
        }, (err, res) => {
            api.sendMessage(res.output, message.threadID);
        });
    });
});