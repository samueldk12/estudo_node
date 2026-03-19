const fs = require('node:fs/promises');

// (async () => {
//     console.time("writeMany")
//     const file = await fs.open('test.txt','w')

//     for(let i=0;i<1000000;i++){
//         await file.write(` ${i}`)
//     }
//     console.timeEnd("writeMany")
// })()

// (async () => {
//     console.time("writeMany")
//     fs.open('test.txt','w', (err , fd) => {
//         for(let i=0;i<1000000;i++){
//             fs.write(fd, ` ${i}`, () => {

//             })
//         }   
//         console.timeEnd("writeMany")
//     })
// })()


// (async () => {
//     console.time("writeMany")
//     fs.open('test.txt','w', (err , fd) => {
//         for(let i=0;i<1000000;i++){
//             const buff = Buffer.from(` ${i}`, 'utf-8');
//             fs.writeSync(fd, buff)
//         }   
//         console.timeEnd("writeMany")
//     })
// })()

//Nao fazer isso. 
// (async () => {
//     console.time("writeMany")
//     const file = await fs.open('test.txt','w')

//     const stream = file.createWriteStream()

//     for(let i=0;i<1000000;i++){
//         const buff = Buffer.from(` ${i}`, 'utf-8');
//         stream.write(buff)
//     }
//     console.timeEnd("writeMany")
// })()


(async () => {
    console.time("writeMany")
    const file = await fs.open('test.txt','w')

    const stream = file.createWriteStream()

    for(let i=0;i<1000000;i++){
        const buff = Buffer.from(` ${i}`, 'utf-8');
        stream.write(buff)
    }
    console.timeEnd("writeMany")
})()