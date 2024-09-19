const fs = require('fs');
var ping = require('ping');

const breakChar = "\r\n"; //change break character in file

Reset = "\x1b[0m";
Bright = "\x1b[1m";
Dim = "\x1b[2m";
Underscore = "\x1b[4m";
Blink = "\x1b[5m";
Reverse = "\x1b[7m";
Hidden = "\x1b[8m";

FgBlack = "\x1b[30m";
FgRed = "\x1b[31m";
FgGreen = "\x1b[32m";
FgYellow = "\x1b[33m";
FgBlue = "\x1b[34m";
FgMagenta = "\x1b[35m";
FgCyan = "\x1b[36m";
FgWhite = "\x1b[37m";
FgGray = "\x1b[90m";

BgBlack = "\x1b[40m";
BgRed = "\x1b[41m";
BgGreen = "\x1b[42m";
BgYellow = "\x1b[43m";
BgBlue = "\x1b[44m";
BgMagenta = "\x1b[45m";
BgCyan = "\x1b[46m";
BgWhite = "\x1b[47m";
BgGray = "\x1b[100m";


const serverFile = fs.readFileSync("servers.txt", "utf-8");
const hosts = serverFile.split(breakChar);
var pings = []

const promises = hosts.map(function (host) {
    return ping.promise.probe(host)
        .then(function (res) {
            if (res.time == "unknown") {
                process.stdout.write(BgRed);
                process.stdout.write(host);
                process.stdout.write(" => " + ((res.time == "unknown") ? "NOT AVAILABLE" : res.time + " ms"));
                process.stdout.write(Reset);
            } else {
                pings.push({'host':host, 'time':res.time});
                process.stdout.write(BgGreen);
                process.stdout.write(host);
                process.stdout.write(" => " + ((res.time == "unknown") ? "NOT AVAILABLE" : res.time + " ms"));
                process.stdout.write(Reset);
            }
            console.log();
        });
});
/*
Promise.all(promises).then(() => {
    pings.sort(function(a, b) {
        return a.time - b.time;
    });
    
    console.log(pings);
});
*/
