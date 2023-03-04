

class App{
    constructor(){
        this.startBtn = document.querySelector("#start");
        this._setupStartBtn();

    }
    getFloatFixed(value, fixed){
        return (Math.round(value * 1e11) / 1e9).toPrecision(fixed)
    }
    _setupStartBtn(){
        this.startBtn.addEventListener("click", ()=>{
            this.values = this._getValues();
            document.querySelector("#start-modal").style.display = "none";
            document.querySelector("#main-body").style.display = "block";
            this.birth = moment(this.values.birth);
            this.death = moment(this.values.death);
            this.diffBirthDeath = moment.duration(this.death.diff(this.birth));

            this.profileName = document.querySelector("#profile-name");
            this.dateDate = document.querySelector("#date-date");
            this.profileRemaindate = document.querySelector("#profile-remaindate");
            this.ddayNum = document.querySelector("#dday-num")
            this.iconText = document.querySelector("#icon-text");
            this.ageclassName = document.querySelector("#ageclass-name");
            this.rangeDeath = document.querySelector("#range-death");
            this.totalRange = document.querySelector("#range-total");
            this.totalRangeInfo = document.querySelector("#total-range-info")
            this.ageDate = document.querySelector("#age-date")
            this.nextAge = document.querySelector("#next-age")
            this.ageRange = document.querySelector("#subrange-age-bar")
            this.ageRangeInfo = document.querySelector("#age-range-info");
            this.nextClass = document.querySelector("#next-class")
            this.classDate = document.querySelector("#class-date");
            this.subrangeClassBar = document.querySelector("#subrange-class-bar");
            this.classRangeInfo = document.querySelector("#class-range-info");
            this.details = document.querySelectorAll("details");
            // requestAnimationFrame(this.render.bind(this));
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
        
        this.now = moment();
        
        this.diffBirthNow = moment.duration(this.now.diff(this.birth));
        this.diffNowDeath = moment.duration(this.death.diff(this.now));
        this.diffs = [this.diffBirthDeath, this.diffBirthNow, this.diffNowDeath]
        const age = this.diffBirthNow.years()
        const ageClass = (Math.floor(age / 10)) * 10;
        
        this.profileName.innerHTML = `${this.ageToClass1(age)}&nbsp<b>${this.values.name}</b>`
        this.dateDate.innerHTML = `${this.birth.format("l")}<br>${this.death.format("l")}`;
        this.profileRemaindate.innerHTML = `${this.diffNowDeath.years()}년 ${this.diffNowDeath.months()}개월 ${this.diffNowDeath.days()}일 남았습니다.`
        this.ddayNum.innerHTML = `D-${Math.floor(this.diffNowDeath.asDays())}`
        this.iconText.innerHTML = `${this.yearToClass(this.birth.year())}`
        this.ageclassName.innerHTML = `${age}세`
        this.rangeDeath.innerHTML = `${this.death.format('ll')}`
        this.totalRange.value = this.diffBirthNow.asMilliseconds();
        this.totalRange.max = this.diffBirthDeath.asMilliseconds()
        
        
        this.totalRangeInfo.innerHTML = `${this.getFloatFixed(this.totalRange.value / this.totalRange.max, 11)}%`
        this.totalRangeInfo.style.transform = `translate(calc((100% - 95px) * ${this.totalRange.value / this.totalRange.max}), -2px)`
        

        this.ageDate.innerHTML = `${this.birth.clone().add(age + 1, "y").format("l")}`
        this.nextAge.innerHTML = `${age + 1}세`
        this.ageRange.value = moment.duration(this.now.diff(this.birth.clone().add(age, "y"))).asMilliseconds();
        this.ageRange.max = moment.duration(this.birth.clone().add(age + 1, "y").diff(this.birth.clone().add(age , "y"))).asMilliseconds()
        this.ageRangeInfo.innerHTML = `${this.getFloatFixed(this.ageRange.value / this.ageRange.max, 8)}%`


        this.classDate.innerHTML = `${this.birth.clone().add(ageClass + 10, "y").format("l")}`
        this.nextClass.innerHTML = `${ageClass + 10}대`
        this.subrangeClassBar.value = moment.duration(this.now.diff(this.birth.clone().add(ageClass, "y"))).asMilliseconds();
        this.subrangeClassBar.max = moment.duration(this.birth.clone().add(ageClass + 10, "y").diff(this.birth.clone().add(ageClass , "y"))).asMilliseconds();
        this.classRangeInfo.innerHTML = `${this.getFloatFixed(this.subrangeClassBar.value / this.subrangeClassBar.max, 8)}%`

        
        this.details.forEach((d,i)=>{
            d.innerHTML = `
            <summary>${Math.floor(this.diffs[i].asDays())}일</summary>
            <p>${Math.floor(this.diffs[i].asWeeks())}주일<br>
            ${Math.floor(this.diffs[i].asMonths())}개월<br>
            ${Math.floor(this.diffs[i].asYears())}년<br>
            ${Math.floor(this.diffs[i].asHours())}시간<br>
            ${Math.floor(this.diffs[i].asMinutes())}분<br>
            ${Math.floor(this.diffs[i].asSeconds())}초
            </p>
            `
        })
        

        
    }
    render(){
        this.update();
		requestAnimationFrame(this.render.bind(this));
    }

    update(){
        this._setValues()
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
