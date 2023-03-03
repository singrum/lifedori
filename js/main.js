class App{
    constructor(){
        this.startBtn = document.querySelector("#start");
        this._setupStartBtn();
    }
    _setupStartBtn(){
        this.startBtn.addEventListener("click", ()=>{
            this.values = this._getValues();
            document.querySelector("#start-modal").style.display = "none";
            document.querySelector("#main-body").style.display = "block";
        })
    }
    _getValues(){
        return {
            name : document.querySelector("#name").value,
            birth : document.querySelector("#birth").value,
            death : document.querySelector("#death").value,
        }
    }

}

window.onload = function () {
	new App();
};
