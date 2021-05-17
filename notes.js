const fs = require('fs')
const chalk = require('chalk')
const { title } = require('process')


const addNote = function(title,body){
    const notes = loadNotes()

    const duplicateNotes = notes.filter((note)=> note.title === title)

    if(duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body      
        })

        savenotes(notes)
        console.log(chalk.green.inverse('new note created'))
    }else{
        console.log(chalk.green.inverse('note title is taken'))
    }
}

const savenotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = () => {

    try {
        const databuffer = fs.readFileSync('notes.json')
        const dataJSON = databuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e){
        return []
    }

}

const removeNote = (title) => {
    const notes = loadNotes()
    const notestokeep = notes.filter((note) => note.title !== title)

    if(notes.length > notestokeep.length)
    {
        console.log(chalk.green.inverse('note removed'))
        savenotes(notestokeep)
    }else{
        console.log(chalk.red.inverse('no note found'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse.blue('your notes: '))

    notes.forEach((note) => {
        console.log(note.title)
    })   
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if(note) {
        console.log(chalk.blue.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('note not found'))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}