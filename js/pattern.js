
class Pattern {
    constructor() {
        this.datas = null
    }
    RegisterOnReady() {
        $($.proxy(this.onReady, this))
    }
    onReady() {
        console.log("Pattern.onReady")
        $('.condition').show()

        let setting = {
            type: 'GET',
            dataType: 'json',
            success: (datas, status, xhr) => {
                this.datas = datas
                this.createOptionFields(this.datas)
            }
        }
        $.ajax('https://api.myjson.com/bins/crrrn', setting)
    }

    createOptionFields(datas){
        $.each(datas, function (index, value) {
            for (let i = 0; i < value.length; i++) {
                $('#Pattern').append('<option name='+value[i].name + ">"+value[i].name +"</option>" )
            }
        })
    }
    static GetSelect(json, selected) {
        let html = '<select>'

        for (var property in json) {
            html += '<option value="' + property + '"'
            if (selected === property) {
                html += ' selected="selected"'
            }

            html += '>' + json[property] + '</option>'
        }

        html += '</select>'
        return html
    }
    static GetHtmlRow(step) {
        let settings = $.extend({
            if: "#FFFFFF",
            then: {
                color: "#FFFFFF",
                direction: "left"
            }
        }, step)

        let html = '<tr data-if-color="' + settings.if + '">'
        html += '<td class="if-color">' + PatternColor[settings.if] + '</td>'
        html += '<td class="then-color">' + Pattern.GetSelect(PatternColor, settings.then.color) + '</td>'
        html += '<td class="then-direction">' + Pattern.GetSelect(PatternDirection, settings.then.direction) + '</td>'
        html += '</tr>'
        return html
    }
}

const PatternColor = Object.freeze({
    "#FFFFFF": "Blanc",
    "#6D9ECE": "Bleu Clair",
    "#1F5FA0": "Bleu Fonc&eacute;",
    "#6D071A": "Bordeaux",
    "#606060": "Gris",
    "#F0C300": "Jaune",
    "#000000": "Noir",
    "#FF7F00": "Orange",
    "#E0115F": "Rose",
    "#DB1702": "Rouge",
    "#008020": "Vert",
    "#7F00FF": "Violet"
})

const PatternDirection = Object.freeze({
    "left": "Gauche",
    "right": "Droite"
})
