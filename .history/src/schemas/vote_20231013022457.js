const { model, Schema } = require('mongoose');

let vote = new Schema(
    {
        Guild: { type: String },
        Msg: { type: String },
        UpMembers: { type: Array },
        DownMembers: { type: Array },
        UpVote: { type: Number },
        DownVote: { type: Number },
        Owner: { type: String }
    }
);

module.exports = model("vote", vote);