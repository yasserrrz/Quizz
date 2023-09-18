/// <reference types="../@types/jquery" />
import { Exam } from "./exam.module.js";
export class Sitting {
    constructor() {
        document.getElementById("start").addEventListener("click", () => {
            this.getStart();
        })
    }
    async getStart() {
        this.caregory = document.getElementById("caregory").value;
        // this.difficulty = Array.from(document.getElementsByName("difficulty")).filter((e)=>{
        //     return e.checked
        // })
        // console.log(this.difficulty[0].value)
        this.difficulty = document.querySelector(`[name="difficulty"]:checked`).value;
        console.log(this.difficulty);
        this.amount = document.getElementById("amount").value;

        if (this.amount == "" || this.amount == "0") {
            $("#alert").html("enter number of qustions")
            document.getElementById("alert").style.display = "block";
            $("#alert").fadeIn(500);
        } else {
            if (+this.amount > 30) {
                document.getElementById("alert").innerHTML = "The Maximum Number Of Quistions Is 30";
                $("#alert").fadeIn(500);
            } else {
                $("#alert").fadeOut(300)
                const result = await this.getData(this.amount, this.caregory, this.difficulty);
                // console.log(result)
                $("#setting").addClass("d-none")
                $("#qustions").removeClass("d-none")
                const myQestions = new Exam(result, this.amount);
                const QuestionNum = myQestions.results.length
            }
        }
    }

    async getData(amount, category, difficulty) {
        const apiRespo = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`).catch((error) => {
            return window.alert(error)
        });
        const response = await apiRespo.json();
        return response.results
    }
}