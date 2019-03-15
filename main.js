var Random = require('random-js'),
    fs = require('fs'),
    stackTrace = require('stacktrace-parser')
    ;
;
var filenames=[];
const glob = require('glob');
var files=[];
files=glob.sync('/home/vagrant/iTrust2-v4/iTrust2/src/main/java/edu/ncsu/csc/itrust2/**/*.java');
console.log(files);

var fuzzer = 
{
    random : new Random(Random.engines.mt19937().seed(0)),

    seed: function (kernel)
    {
        fuzzer.random = new Random(Random.engines.mt19937().seed(kernel));
    },
mutate:
{
    string: function(val)
    {
        // MUTATE IMPLEMENTATION HERE
        var array = val.split('\n');
        var words=[]; 
        for (var i=0;i<array.length;i++)
        {
            var tempArr = array[i].split(' ');
            words.push.apply(words,tempArr);
        }            
        for (var a = 0; a < array.length; a++) {  

        if (array[a]!='')
            {
            var regMatch = array[a].match('"(.*?)"');
            if( fuzzer.random.bool(0.20) ){

                if (regMatch!=null)
                {
                    array[a]=array[a].replace(regMatch[1],mutateliteralstr(10));
                }   
            }
            if( fuzzer.random.bool(0.20) ){
                if (array[a]== '<'){
                    array[a]= '>';
                }
            } 
            if( fuzzer.random.bool(0.20) ){
                if (array[a]== '=='){
                    array[a]= '!=';
                }
            } 
            if( fuzzer.random.bool(0.20) ){
                if (array[a]== '0'){
                    array[a]= '1';
                }
            } 
            if( fuzzer.random.bool(0.20) ){
                if (array[a]== '"if"'){
                    array[a]= '"fi"';
                }
            } 
            }           
        }
        return array.join('\n');
    }

}
};

if( process.env.NODE_ENV != "test")
{
   console.log(files);
    fuzzer.seed(0);
    mutationTesting(files,5);
}

function mutateliteralstr(length)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function mutationTesting(paths,iterations)
{
    var failedTests = [];
    var reducedTests = [];
    var passedTests = 0;
    let filenum=Math.floor((Math.random() * paths.length-1) + 1);
    console.log(filenum,paths.length);
    var markDownA = fs.readFileSync(paths[filenum],'utf-8');
    console.log(paths[filenum]);
    for (var i = 0; i < iterations; i++) {
        let mutuatedString = fuzzer.mutate.string(markDownA);
        try
        {
            const { exec } = 

            marqdown.render(mutuatedString);
            passedTests++;
        }
        catch(e)
        {
            failedTests.push( {input:mutuatedString, stack: e.stack} );
        }

        fs.writeFileSync(paths[filenum],mutuatedString+" ",'utf-8');
    }
reduced = {};
// RESULTS OF FUZZING
for( var i =0; i < failedTests.length; i++ )
{
    var failed = failedTests[i];

    var trace = stackTrace.parse( failed.stack );
    var msg = failed.stack.split("\n")[0];
    let key = trace[0].methodName + "." + trace[0].lineNumber;
    if( !reduced.hasOwnProperty( key ) )
    {
    }
}

for( var key in reduced )
{
    console.log( reduced[key] );
}

}

exports.mutationTesting = mutationTesting;
exports.fuzzer = fuzzer;

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

