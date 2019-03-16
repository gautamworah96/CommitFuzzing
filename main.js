//load dependencies
var fs = require('fs')
var path = require('path')
//var recursive = require("recursive-readdir");

//get all java files

var n = 2;
var filenames=[];
const glob = require('glob');
var files=[];
files=glob.sync('/home/vagrant/iTrust2-v4/iTrust2/src/main/java/edu/ncsu/csc/itrust2/**/*.java');
console.log(files);


let filenum=Math.floor((Math.random() * files.length-1) + 1);
filename=files[filenum];
console.log(filename);
var data = fs.readFileSync(filename, 'utf8');
var lines = data.split("\n");
console.log(lines);

for (var i=0;i<lines.length;i++){
    prob=Math.random();
    if (prob>0.2){
        if(lines[i].match('while') || lines[i].match('for') || lines[i].match('if'))
                {
                    
                    if(lines[i].match('<')){
                    lines[i]=lines[i].replace('<', '>');
                    console.log("replaced"+lines[i]);
                    }
                    else if(lines[i].match('>') && !lines[i].match('->')){
                    lines[i]=lines[i].replace('>', '<');
                    }
        
                }
                }
    if (prob>0.3){
        if(lines[i].match('==')){
            lines[i]=lines[i].replace(/==/g,'!=');}
        else if(lines[i].match('!=')){
            lines[i]=lines[i].replace(/!=/g,'==');}
        }
    if (prob>0.4){
        if((lines[i].match('while') || lines[i].match('for') || lines[i].match('if')) && lines[i].match(/[0]/))
              {
                lines[i]=lines[i].replace(/[0]/g,"1");
              }
              else if((lines[i].match('while') || lines[i].match('for') || lines[i].match('if')) && lines[i].match('1'))
              { 
                  lines[i]=lines[i].replace(/[1]/g,'0');
              }
    }
    if (prob>0.25){
        var regMatch = lines[i].match('"(.*?)"');
        if (regMatch!=null)
                    {
                        lines[i]=lines[i].replace(regMatch[1],mutateliteralstr(10));
                    }
    }
    if (prob>0.5){
        if(lines[i].match('true')){
            lines[i]=lines[i].replace('true', 'false');
          }
        else if(lines[i].match('false')){
            
              lines[i]=lines[i].replace('false', 'true');
            }
        
    }

}
function mutateliteralstr(length)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var j = 0; j < length; j++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));  
    return text;
}
            
console.log(lines);
fs.writeFileSync(filename,lines+" ",'utf-8');
    


