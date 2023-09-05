function main() {
    console.log('loaded')
    const canvas = document.getElementById('my-canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class Bar {
        constructor(x, y, width, height, color) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height
            this.color = color
        }
    
        update(mainInput) {
            this.height = mainInput * 1000
        }
        draw(context) {
            context.fillStyle = this.color
            context.fillRect(this.x, this.y, this.width, this.height)    
        }
    }

    const microphone = new Microphone()
    let bars = []
    let barWidth = canvas.width/256
    function createBars() {
        for (let i = 0; i < 256; i++) {
            let color = 'hsl('+ i* 2 + ', 100%, 50%)'
            bars.push(new Bar(i * barWidth, canvas.height/2, 1, 20, color))
        }
    }

    const microphoneButton = document.getElementById('microphone')
    let on = false

    microphoneButton.addEventListener('click', () => {
        if (on === false) {
            on = true
            createBars()
            microphoneButton.innerHTML = '<i class="fa-solid fa-microphone"></i>'
        } else if (on === true) {
            microphoneButton.innerHTML = `
            <i class="fa-solid fa-microphone-slash"></i>
          `
          location.reload()
        }
    })
    console.log(bars)
    
    function animate() {
        if (microphone.initialized) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            const samples = microphone.getSamples()
            bars.forEach(function(bar, i) {
                bar.update(samples[i])
                bar.draw(ctx)
            })
        }
        requestAnimationFrame(animate)
    }
    
    animate()
}