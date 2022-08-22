import fs from 'fs'
import readline from 'readline'

const readStream = fs.createReadStream('./access.log', 'utf8')
const writeStream1 = fs.createWriteStream('./198.82.244.113_requests.log')
const writeStream2 = fs.createWriteStream('./33.135.95.100_requests.log')

let numStr = 0

const rl = readline.createInterface({
  input: readStream,
  terminal: true
});

rl.on('line', (line) => {
  if (line.includes("198.82.244.113")) {
    writeStream1.write(line + "\n")
  }

  if (line.includes("33.135.95.100")) {
    writeStream2.write(line + "\n")
  }

  console.log(++numStr)
})