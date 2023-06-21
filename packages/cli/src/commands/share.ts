import path from 'path';
import { Command } from 'commander';
// import { filename } from '.\serve.ts';
import { Dropbox } from 'dropbox';
import { Readable } from 'stream';
import fs from 'fs';
import { files } from 'dropbox';


const isProduction = process.env.NODE_ENV === 'production';
const accessToken = 'sl.BgvXGVhRXUFVh2jTyITnmgEkQu09MPAE1mdwUTR-G_XUQuA2Hx9TRUYipEXw2pqpLBYj6qp8YzRA7q9uDwbOk2Kk7VBUtHGMl747EtOwb22lus9IZkBviWX_iWd8sLUs85XUvik';
const dbx = new Dropbox({ accessToken });


interface LocalApiError {
  code: string;
}

async function uploadFile(filePath: string, destinationPath: string) {
  // Read the file as a stream
  const fileStream = new Readable();
  fileStream.push(fs.readFileSync(filePath));
  fileStream.push(null); // End the stream

  // Upload the file to Dropbox
  try {
    const response = await dbx.filesUpload({
      path: destinationPath,
      contents: fileStream,
    });
    const uploadedFileMetadata = response.result as files.FileMetadata;
    console.log('File uploaded:', uploadedFileMetadata.path_display);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

export const shareCommand = new Command()
  .command('share <filename>')
  .description('whatever')
  .action(async(filename = 'notebook.js') => {
    try{
      const dir = path.join(process.cwd(), path.dirname(filename));
      await uploadFile(filename, '/Aplikacje/podokumentowane')
      console.log(
        `sharing ${filename}.`
      )
    } catch(err) {
      // if (isLocalApiError(err)) {
      //   if (err.code === "EADDRINUSE") {
      //     console.error("Port is in use. Try running on a different port.");
      //   }
      // } else if (err instanceof Error) {
      //   console.log("Heres the problem", err.message);
      // }
      // process.exit(1);
      const hasErrCode = (x: any): x is LocalApiError => {
        return x.code;
      };
      if (hasErrCode(err)) {
        if (err.code === "EADDRINUSE") {
          console.log("error.");
        }
      } else if (err instanceof Error) {
        console.log("Heres the problem", err.message);
      }
      process.exit(1);
    }
  });

