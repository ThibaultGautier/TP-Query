
class Simulation {
    constructor() {
        
    }
    RegisterOnReady() {
        $($.proxy(this.onReady, this))
    }
    onReady() {
        console.log("Simulation.onReady")
        
    }
    get Size() {
        return parseInt($("input:radio[name='size']:checked").val())
    }

    ResetGridSize() {
        this.Grid.Size = this.Simulation.Size
        this.Ant.Reset(this.Grid.MiddleX, this.Grid.MiddleY)
        clearInterval(this.intervalLooping)
        this.Simulation.IsRunning = false
    }

    MoveAnt() {
        let nbSteps = $('#NbSteps').val()
        for (let i = 1; i <= nbSteps; i++) {
            let colorCase = this.Grid.GetColor(this.Ant.X, this.Ant.Y)
            let x_position = this.Ant.X
            let y_position = this.Ant.Y

            if (colorCase === "#FFFFFF") {
                this.Ant.Turn("right")
                this.Grid.SetColor(x_position, y_position, "#000000")
            }
            if (colorCase === "#000000") {
                this.Ant.Turn("left")
                this.Grid.SetColor(x_position, y_position, "#FFFFFF")
            }
        }
    }

    get IsRunning() {
        return $('#Start').attr('data-is-running')
    }

    set IsRunning(value) {
        $('#Start').attr("data-is-running",value).text(value ? 'Arreter' : 'Demarrer')
    }
}


