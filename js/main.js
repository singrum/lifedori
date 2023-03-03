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
            this._setValues();
        })
    }
    _getValues(){
        return {
            name : document.querySelector("#name").value,
            birth : document.querySelector("#birth").value,
            death : document.querySelector("#death").value,
        }
    }
    _setValues(){

        const birth = moment(this.values.birth);
        const now = moment();
        const death = moment(this.values.death);
        const diffBirthNow = moment.duration(now.diff(birth));
        const diffNowDeath = moment.duration(death.diff(now));
        const diffBirthDeath = moment.duration(death.diff(birth));
        
        document.querySelector("#profile-name").innerHTML = `${this.ageToClass1(diffBirthNow.years())}&nbsp<b>${this.values.name}</b>`
        document.querySelector("#date-date").innerHTML = `${this.values.birth.replace(/-/g, ".")}<br>${this.values.death.replace(/-/g, ".")}`;
        document.querySelector("#profile-remaindate").innerHTML = `${diffNowDeath.years()}년 ${diffNowDeath.months()}개월 ${diffNowDeath.days()}일 남았습니다.`
        document.querySelector("#dday-num").innerHTML = `D-${Math.floor(diffNowDeath.asDays())}`
        document.querySelector("icon-text").innerHTML = `${yearToClass(birth.year())}`
        
        birth.year()
        document.querySelector("#ageclass-name").innerHTML = `${diffBirthNow.years()}세`

    }
    ageToClass1(age){
        switch(parseInt(age / 10)){
            case 0:
                return "어린이";
            case 1:
                return "10대";
            case 2:
                return "20대";
            case 3:
                return "30대";
            case 4:
                return "40대";
            case 5:
                return "50대";
            case 6:
                return "60대";
            case 7:
                return "70대";
            case 8:
                return "80대";
            case 9:
                return "90대";
            default:
                return "장수노인";       
        }
    }
    yearToClass(year){
        if(1946 <= year && year <= 1954) return "WAR";
        else if(1955 <= year && year <= 1969) return "BOOM";
        else if(1970 <= year && year <= 1984) return "X";
        else if(1985 <= year && year <= 2006) return "MZ";
        else if(2006 <= year) return "α";
    }

}

window.onload = function () {
	new App();
};
