/// <reference types="../@types/jquery" />

export class Exam {
    constructor(results, num) {
        this.results = results;
        console.log(this.results);
        this.QuestionNum = num;
        this.currentIndex = 0;
        this.to = document.getElementById("to");
        this.of = document.getElementById("of");
        this.score = 0;
        this.qustionTitel = document.getElementById("qustionTitel");
        this.showAns = document.getElementById("showAns");
        this.state = document.getElementById("state");
        this.showQuestion();

        document.getElementById("submit").addEventListener("click", () => {
            this.nextQuestion();
        })
        document.getElementById("tryAgain").addEventListener("click", () => {
            this.currentIndex = 0;
            this.score = 0;
            // >>>>>>>> STATE 1
            // $("#qustions").removeClass("d-none");
            // $("#grade").addClass("d-none");
            // this.showQuestion();
            // >>>> STATE 2
            location.reload();
        })
    }
    showQuestion() {
        this.to.innerText = this.currentIndex + 1;
        this.of.innerText = this.QuestionNum;
        this.currentQuestion = this.results[this.currentIndex];
        console.log(this.currentQuestion.question)
        this.correctAns = this.currentQuestion.correct_answer;
        this.qustionTitel.innerText = "Q: " + this.currentQuestion.question;
        const answers = [...this.currentQuestion.incorrect_answers]; // deep copy 
        console.log(this.correctAns, answers);
        const randomNum = Math.ceil(Math.random() * answers.length);
        answers.splice(randomNum, 0, this.correctAns);
        console.log(answers);
        let tmp = ``;
        for (let i = 0; i < answers.length; i++) {
            tmp += `
            <div class="pretty p-default p-round d-block mb-3">
                <input type="radio" value="${answers[i]}" name="answer"  />
                <div class="state p-danger-o">
                  <label>${answers[i]}</label>
                </div>
              </div>
            `
        }
        this.showAns.innerHTML = tmp;

    }
    nextQuestion() {
        const userAns = document.querySelector('[name="answer"]:checked')?.value;
        console.log(userAns);
        if (userAns == undefined) {
            $("#alert2").fadeIn(500);

        } else {
            console.log(this.currentIndex)
            $("#alert2").fadeOut(500)
            if (userAns == this.correctAns) {
                this.state.innerHTML = "Correct";
                $("#state").fadeIn(1000);
                $("#state").fadeOut(2000);
                this.score++;
            } else {
                this.state.innerHTML = "Wrong";
                $("#state").fadeIn(1000);
                $("#state").fadeOut(1000);
            }
            this.currentIndex++;
            if (this.currentIndex <= this.QuestionNum - 1) {
                this.showQuestion()
            } else {
                setTimeout(() => {
                    $("#grade").removeClass("d-none");
                    $("#qustions").addClass("d-none");
                }, 1100)
                $("#scoreCount").html(`Your Score Is ${this.score} Of ${this.QuestionNum}`)
            }

        }
    }
}