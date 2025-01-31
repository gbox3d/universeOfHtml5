export default async () => {
    
    console.log('start')
    let now = moment()
    console.log(now.format('YYYY-MM-DD HH:mm:ss'))
    

    document.querySelector('h1.now').innerHTML = `${now.format('YYYY-MM-DD HH:mm:ss')}`

    document.querySelector('h2.after').innerHTML = `${now.add(10, 'm').format('YYYY-MM-DD HH:mm:ss')}`

    let hellowin = moment('2071-10-31')

    document.querySelector('h2.hellowin').innerHTML = `${hellowin.format('YYYY-MM-DD HH:mm:ss')}`
    
}