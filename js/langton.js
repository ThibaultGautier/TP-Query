/// <reference path="ant.js" />
/// <reference path="grid.js" />
/// <reference path="pattern.js" />
/// <reference path="simulation.js" />

class Langton {
    constructor() {
        this.Pattern = new Pattern()
        this.Simulation = new Simulation()
    }
    RegisterOnReady() {
        this.Pattern.RegisterOnReady()
        this.Simulation.RegisterOnReady()

        $($.proxy(this.onReady, this))
    }
    onReady() {
        this.Grid = new Grid("Grid", this.Simulation.Size)
        this.Ant = new Ant(this.Grid.MiddleX, this.Grid.MiddleY)
        this.displayAntInfo()

        $(this.Ant).on("move", $.proxy(this.displayAntInfo, this))
        $('#Reset').on('click', $.proxy(this.Simulation.ResetGridSize, this))
        $("input:radio").on('change', $.proxy(this.Simulation.ResetGridSize, this))
        $('#MoveForward').on('click', $.proxy(this.Simulation.MoveAnt, this))
        $('#Start').on('click', $.proxy(this.Move, this))
        $('#Pattern').on('change', $.proxy(this.onchangePatternCondition, this))


        console.log("Langton.onReady")
    }
    displayAntInfo() {
        this.Grid.SetColor(this.Ant.X, this.Ant.Y, Ant.Color)
        $('.ant-x').text(this.Ant.X)
        $('.ant-y').text(this.Ant.Y)
        $('.ant-direction').text(this.Ant.Direction)
        $('.ant-nb-steps').text(this.Ant.NbSteps)
    }
    MoveAntUntilOut() {
        let interval = parseInt($('#Interval').val())
        this.Simulation.IsRunning = true

        this.intervalLooping = setInterval($.proxy(function () {
            let x_position = this.Ant.X
            let y_position = this.Ant.Y
            let colorCase = this.Grid.GetColor(x_position, y_position)

            if (colorCase === "#FFFFFF") {
                this.Ant.Turn("right")
                this.Grid.SetColor(x_position, y_position, "#000000")
            }
            if (colorCase === "#000000") {
                this.Ant.Turn("left")
                this.Grid.SetColor(x_position, y_position, "#FFFFFF")
            }
        }, this), interval)
    }


    StopMoveAntUntilOut() {
        this.Simulation.IsRunning = false
        clearInterval(this.intervalLooping)
    }


    Move() {
        if (this.Simulation.IsRunning === "true") {
            this.StopMoveAntUntilOut()
        }
        else {
            this.MoveAntUntilOut()
        }
    }

    onchangePatternCondition() {
        let condition = $('#Pattern').val()
        let newHTML = null

        //Clean le tableau
        $('#CurrentPattern').find("tr:gt(1)").remove();

        if (condition === 'Simple') {
            for (let i = 0; i < this.Pattern.datas['patterns'][0].steps.length; i++) {
                newHTML += Pattern.GetHtmlRow(this.Pattern.datas['patterns'][0].steps[i])
            }
            $('#CurrentPattern').append(newHTML)
        }

        if (condition === 'Tout droit') {
            for (let i = 0; i < this.Pattern.datas['patterns'][1].steps.length; i++) {
                newHTML += Pattern.GetHtmlRow(this.Pattern.datas['patterns'][1].steps[i])
            }
            $('#CurrentPattern').append(newHTML)
        }

        if (condition === 'Inondation') {
            for (let i = 0; i < this.Pattern.datas['patterns'][2].steps.length; i++) {
                newHTML += Pattern.GetHtmlRow(this.Pattern.datas['patterns'][2].steps[i])
            }
            $('#CurrentPattern').append(newHTML)
        }

        if (condition === 'Prisme') {
            for (let i = 0; i < this.Pattern.datas['patterns'][3].steps.length; i++) {
                newHTML += Pattern.GetHtmlRow(this.Pattern.datas['patterns'][3].steps[i])
            }
            $('#CurrentPattern').append(newHTML)
        }
        
        if (condition === 'Serpent') {
            for (let i = 0; i < this.Pattern.datas['patterns'][4].steps.length; i++) {
                newHTML += Pattern.GetHtmlRow(this.Pattern.datas['patterns'][4].steps[i])
            }
            $('#CurrentPattern').append(newHTML)
        }
    }
}


let langton = new Langton()
langton.RegisterOnReady()