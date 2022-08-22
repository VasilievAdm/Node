import fs from 'fs'

const ACCESS_LOG = 'hw2/access.log';

const createFile = () => {
  const writeStream = fs.createWriteStream(ACCESS_LOG, {
    encoding: "utf-8",
    flags: 'a',
  })
  console.log('starst generating')
  const writingFunc = async (query) => new Promise((resolve, reject) => writeStream.write(query, resolve));

  const ipGen = async () => {
    let ip = (Math.floor(Math.random() * 255) + 1) + "." + (Math.floor(Math.random() * 255)) + "." + (Math.floor(Math.random() * 255)) + "." + (Math.floor(Math.random() * 255));
    let arr = [
      `${ip} - - [25/May/2021:00:07:24 +0000] "POST /baz HTTP/1.1" 200 0 "-" "curl/7.47.0"`,
      `${ip} - - [25/May/2021:00:07:17 +0000] "GET /foo HTTP/1.1" 200 0 "-" "curl/7.47.0"`
    ];
    for (const item of arr) {
      await writingFunc(item + '\n')
    }
    if (fs.lstatSync(ACCESS_LOG).size <= 104857600) {
      await ipGen()
    } else {
      writeStream.end()
      console.log('Генерация завершена')
    }
  }

  fs.stat(ACCESS_LOG, function (err, stat) {
    if (err == null) {
      fs.lstatSync(ACCESS_LOG).size <= 104857600 ? ipGen() : console.log("Файл 100мб")
    } else if (err.code === 'ENOENT') {
      ipGen()
    } else {
      console.log('Some other error: ', err.code);
    }
  });
}

createFile();