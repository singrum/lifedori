class App{
    constructor(){
        this.startBtn = document.querySelector("#start");
        this._setupStartBtn();
    }
    getFloatFixed(value, fixed){
        return (Math.round(value * 1e7) / 1e5).toPrecision(fixed)
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
        const age = diffBirthNow.years()
        const ageClass = (Math.floor(age / 10)) * 10;
        
        document.querySelector("#profile-name").innerHTML = `${this.ageToClass1(age)}&nbsp<b>${this.values.name}</b>`
        document.querySelector("#date-date").innerHTML = `${birth.format("l")}<br>${death.format("l")}`;
        document.querySelector("#profile-remaindate").innerHTML = `${diffNowDeath.years()}년 ${diffNowDeath.months()}개월 ${diffNowDeath.days()}일 남았습니다.`
        document.querySelector("#dday-num").innerHTML = `D-${Math.floor(diffNowDeath.asDays())}`
        document.querySelector("#icon-text").innerHTML = `${this.yearToClass(birth.year())}`
        document.querySelector("#ageclass-name").innerHTML = `${age}세`
        document.querySelector("#range-death").innerHTML = `${death.format('ll')}`
        const totalRange = document.querySelector("#range-total");
        [totalRange.value, totalRange.max] = [diffBirthNow.asMilliseconds(),diffBirthDeath.asMilliseconds()]
        const totalRangeInfo = document.querySelector("#total-range-info")
        totalRangeInfo.innerHTML = `${this.getFloatFixed(totalRange.value / totalRange.max, 7)}%`
        totalRangeInfo.style.transform = `translate(calc((100% - 67px) * ${totalRange.value / totalRange.max}), -2px)`
        

        document.querySelector("#age-date").innerHTML = `${birth.clone().add(age + 1, "y").format("l")}`
        document.querySelector("#next-age").innerHTML = `${age + 1}`
        const ageRange = document.querySelector("#subrange-age-bar");
        ageRange.value = moment.duration(now.diff(birth.clone().add(age, "y"))).asMilliseconds();
        ageRange.max = moment.duration(birth.clone().add(age + 1, "y").diff(birth.clone().add(age , "y"))).asMilliseconds()
        const ageRangeInfo = document.querySelector("#age-range-info")
        ageRangeInfo.innerHTML = `${this.getFloatFixed(ageRange.value / ageRange.max, 7)}%`
        // ageRangeInfo.style.transform = `translate(${(window.innerWidth - 80 - 67) * ageRange.value / ageRange.max}px, -10px)`


        document.querySelector("#class-date").innerHTML = `${birth.clone().add(ageClass + 10, "y").format("l")}`
        document.querySelector("#next-class").innerHTML = `${ageClass + 10}대`
        const classRange = document.querySelector("#subrange-class-bar");
        classRange.value = moment.duration(now.diff(birth.clone().add(ageClass, "y"))).asMilliseconds();
        classRange.max = moment.duration(birth.clone().add(ageClass + 10, "y").diff(birth.clone().add(ageClass , "y"))).asMilliseconds();
        const classInfo = document.querySelector("#class-range-info")
        classInfo.innerHTML = `${this.getFloatFixed(classRange.value / classRange.max, 7)}%`
        // classInfo.style.transform = `translate(calc((100% - 67px) * ${classRange.value / classRange.max}), -10px)`

        const footerValues = document.querySelectorAll(".main-right")
        footerValues[0].innerHTML = diffBirthDeath.asDays()
        footerValues[1].innerHTML = Math.floor(diffBirthNow.asDays());
        footerValues[2].innerHTML = Math.floor(diffNowDeath.asDays());
        footerValues[3].innerHTML = Math.floor(diffNowDeath.asWeeks());
        footerValues[3].innerHTML = Math.floor(diffNowDeath.asMonths());
        console.log(diffNowDeath)
        
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
