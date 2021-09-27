var spsave = require("spsave").spsave;
var fs = require('fs');

function trimSlashes(string) {
    return string.replace(new RegExp('/', 'g'), '_');
}

var coreOptions = {
    siteUrl: process.env.SITE_URL,
};
var creds = {
    username: process.env.USER,
    password: process.env.PASSWD
};

// var now = new Date().toISOString().slice(0,10);
var date = new Date();
console.log("Log Date");

console.log(date);

var now = date.toISOString();
console.log("ISO String " +  now);
now = now.replace(new RegExp(':', 'g'), '-');
console.log("New now " + now);
now = now.split(".")[0];

console.log("Final now " + now);

var ref = "";
if (process.env.GITHUB_REF) {
  ref = process.env.GITHUB_REF.substr(process.env.GITHUB_REF.lastIndexOf('/') + 1);
}

var fileOptions = {
    folder: process.env.LIB_FOLDER, 
    fileName: `${trimSlashes(process.env.GITHUB_REPOSITORY)}_${ref}_${now}.zip`,
    fileContent: fs.readFileSync(process.env.FILE_PATH)
};

spsave(coreOptions, creds, fileOptions)
.then(function(){
    console.log('Success loggin');
})
.catch(function(err){
    console.log('Error loggin');
    process.exit(1);
});
