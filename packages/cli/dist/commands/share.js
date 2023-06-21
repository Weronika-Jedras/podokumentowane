"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shareCommand = void 0;
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
// import { filename } from '.\serve.ts';
const dropbox_1 = require("dropbox");
const stream_1 = require("stream");
const fs_1 = __importDefault(require("fs"));
const isProduction = process.env.NODE_ENV === 'production';
const accessToken = 'sl.BgvXGVhRXUFVh2jTyITnmgEkQu09MPAE1mdwUTR-G_XUQuA2Hx9TRUYipEXw2pqpLBYj6qp8YzRA7q9uDwbOk2Kk7VBUtHGMl747EtOwb22lus9IZkBviWX_iWd8sLUs85XUvik';
const dbx = new dropbox_1.Dropbox({ accessToken });
function uploadFile(filePath, destinationPath) {
    return __awaiter(this, void 0, void 0, function* () {
        // Read the file as a stream
        const fileStream = new stream_1.Readable();
        fileStream.push(fs_1.default.readFileSync(filePath));
        fileStream.push(null); // End the stream
        // Upload the file to Dropbox
        try {
            const response = yield dbx.filesUpload({
                path: destinationPath,
                contents: fileStream,
            });
            const uploadedFileMetadata = response.result;
            console.log('File uploaded:', uploadedFileMetadata.path_display);
        }
        catch (error) {
            console.error('Error uploading file:', error);
        }
    });
}
exports.shareCommand = new commander_1.Command()
    .command('share <filename>')
    .description('whatever')
    .action((filename = 'notebook.js') => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
        yield uploadFile(filename, '/Aplikacje/podokumentowane');
        console.log(`sharing ${filename}.`);
    }
    catch (err) {
        // if (isLocalApiError(err)) {
        //   if (err.code === "EADDRINUSE") {
        //     console.error("Port is in use. Try running on a different port.");
        //   }
        // } else if (err instanceof Error) {
        //   console.log("Heres the problem", err.message);
        // }
        // process.exit(1);
        const hasErrCode = (x) => {
            return x.code;
        };
        if (hasErrCode(err)) {
            if (err.code === "EADDRINUSE") {
                console.log("error.");
            }
        }
        else if (err instanceof Error) {
            console.log("Heres the problem", err.message);
        }
        process.exit(1);
    }
}));
