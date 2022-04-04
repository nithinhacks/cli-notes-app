const chalk = require('chalk')
const notes = require('./notes')
const yargs = require('yargs')
const { argv } = require('yargs')
const figlet = require('figlet');

//banner

figlet('notes app!!', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(chalk.green(data))
    console.log()
    console.log('--by nithin')
    console.log()

    var options=['add','remove','read','list']
    console.log(chalk.yellow.bold('options:'))
    options.map((option) => {
        console.log(`=> ${chalk.cyan(option)}`)
    })
    console.log()

    //add,remove,read,list

    //create add 

    yargs.command({
        command: 'add',
        describe: 'add a new note',
        builder: {
            title: {
                describe: 'title of note',
                demandOption: true,
                type: 'string'
            },
            body: {
                describe: 'Body of notes',
                demandOption: true,
                type: 'string'
            }

        },
        handler: (argv) => {
            notes.addNote(argv.title, argv.body)
        }
    })

    //remove command

    yargs.command({
        command: 'remove',
        describe: 'remove a note',
        builder: {
            title: {
                describe: 'title of note',
                demandOption: true,
                type: 'string'
            }
        },
        handler: (argv) => {
            notes.removeNote(argv.title)
        }
    })

    //list command

    yargs.command({
        command: 'list',
        describe: 'list the notes',
        handler(){
            notes.listNotes()
        }
    })

    //read command

    yargs.command({
        command: 'read',
        describe: 'read a note',
        builder: {
            title: {
                describe: 'title of note',
                demandOption: true,
                type: 'string'
            }
        },
        handler: function(){
            notes.readNote(argv.title)
        }
    })

    yargs.parse()
});



