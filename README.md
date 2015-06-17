# touch-type-trainer

Typing web app (client for Teacher's Trading Post server software)

## Development Setup

For developing, you must install [iojs](https://iojs.org/en/index.html).

After checkout out the source code from Github, open a command prompt in the
source code directory. Run `npm install` to install all the neccessary
dependencies.

To run the development server, run `npm start`. This will start the server on
port 8000 and recompile all neccessary files when the source files are
modified. Visit http://localhost:8000/ in a web browser to run the application.

To build the release files, run `npm run build`. This will compile all the
files and place the output in the `output` directory. You can then copy these
files to your production server or serve the files directly from the `output`
directory.