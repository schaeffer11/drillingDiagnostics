import odb from './../../models/odb'
import inquirer from 'inquirer'

const validateInput = (input) => {
  // Regex for allowing inputs with A-Z, a-z, 0-9, and -_ No spaces or special characters allowed
  const regex = /^[a-zA-Z0-9\-_]{0,40}$/
  // Regex for checking for - or _
  const regexLastChar = /^[-_]/

  // We check that input meets regex, input is not empty, and last character of input is not - nor _
  return regex.test(input) && input !== '' && !regexLastChar.test(input.charAt(input.length - 1)) ? true : 'Cannot be empty, more than 40 characters. No special characters nor spaces allowed. Must not end in - or _'
}

const insertEINData = () => {
  const questions = [
    {
      type: 'input',
      message: 'In which collection should we store this data?',
      name: 'collection',
      default: 'global',
      validate: (input) => validateInput(input)
    },
    {
      type: 'input',
      message: 'What is the data file full address?',
      name: 'address'
    }
  ]

  odb.insertEINData(questions, (data) => {
    console.log(`Successfully inserted ${data} EINs`)
    process.exit()
  })
}

let commands = process.argv.slice(2)
let availableCommands = {
  'insert:EIN': insertEINData
}

// EXECUTE USER COMMAND
if (commands.length) {
  let command = availableCommands[commands[0]]
  command && command()
}