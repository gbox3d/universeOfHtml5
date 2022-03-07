//https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events

async function main() {

    const _h2 = document.querySelector('h2')
    const _btn = document.querySelector('button')
    _h2.addEventListener('yabai', (e) => {
        console.log(e.detail)
        e.target.innerText = `${e.detail.name},${e.detail.age}`
    });

    _btn.addEventListener('click', (e) => {

        const event = new CustomEvent('yabai', { detail : {
            name : 'yabai',
            age : '18'
        } });
        
        _h2.dispatchEvent(event);
    });

    // _h2.dispatchEvent(event);

    
}

export default main;