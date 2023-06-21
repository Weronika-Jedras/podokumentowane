"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const serve_1 = require("./commands/serve");
const share_1 = require("./commands/share");
commander_1.program
    .addCommand(serve_1.serveCommand)
    .addCommand(share_1.shareCommand);
commander_1.program.parse(process.argv);
