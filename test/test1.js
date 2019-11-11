

function test1()
{
    return new Promise((resolve, reject) => {
        resolve(1)
    }).then(() => {
        console.log(2)
    })
}

t1 = test1()

t1.then(() => {
    console.log(3)
})