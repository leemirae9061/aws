import fs from 'fs'
import { resolve } from 'path'

const basePath = resolve() //현재 경로가 base로 잡힘

const filenames = {
  messages: resolve(basePath, 'src/db/messages.json'),
  users: resolve(basePath, 'src/db/user.json')
}

//파일 read, write
export const readDB = target => {
  try {
    return JSON.parse(fs.readFileSync(filenames[target], 'utf-8'))
  } catch (err) {
    console.log(err)
  }
}

export const writeDB = (target, data) => {
  try {
    return fs.writeFileSync(filenames[target], JSON.stringify(data))
  } catch (err) {
    console.log(err)
  }
}
//서버에 어떤 라우트 들어올때마다
