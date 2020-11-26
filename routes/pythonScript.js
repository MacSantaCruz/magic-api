const express = require ('express'); 
const router = express.Router();

async function runPy(arg1, arg2)
{
    return new Promise(function(success, nosuccess) {

        const { spawn } = require('child_process');
        const pyprog = spawn('python', ['./../python-scripts/test.py',arg1,arg2]);
    
        pyprog.stdout.on('data', function(data) {
    
            success(data);
        });
    
        pyprog.stderr.on('data', (data) => {
    
            nosuccess(data);
        });
    });
}

router.get('/', (req, res) => {

    runPy(5,5).then(function(fromRunpy) {
        console.log(fromRunpy.toString());
        res.end(fromRunpy);
    });
})


module.exports = router;