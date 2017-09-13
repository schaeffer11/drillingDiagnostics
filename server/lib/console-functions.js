import colors from 'colors'

export default (target, writeFunction) => {
  target.write = process.stdout.write.bind(process.stdout)

  target.tally = (value, label) => {
    writeFunction('\x1b[0;32m' + value + '\x1b[0;37m ' + label)
  }

  target.header = (label) => {
    process.stdout.write('\n' + label.bold.white + '\n\n')
  }

  target.task = (label) => {
    process.stdout.write((label + '... '))
  }

  target.complete = (message = 'OK', err) => {
    process.stdout.write(message.green + '\n')
  }

  target.incomplete = (message) => {
    process.stdout.write('FAIL'.red + '\n')
    if (message) {
      console.log(message.yellow + '\n')
    }
  }

  target.warn = (message) => {
    console.log(message.yellow)
  }

  target.error = message => console.log(message.red)
}
