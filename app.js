const chalk = require('chalk')
const notes = require('./notes')
const yargs = require('yargs')
const { argv } = require('yargs')

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

