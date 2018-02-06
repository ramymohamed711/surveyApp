class Survey {
    constructor(id, title, quesID, quesTitle, quesType, quesImg, {answer, ansCounter}, sDate, eDate, status, link, qrLink) {
        this.obj = {
            survey_id: id,
            survey_title: title,
            questions:
                [
                    {
                        question_id: quesID,
                        question_title: quesTitle,
                        question_type: quesType,
                        question_img: quesImg,
                        answers: [
                            {answer: answer, counter: ansCounter}
                        ],
                        suggested_answers: []
                    }
                ],
            survey_statDate: sDate,
            survey_endDate: eDate,
            survey_status: status,
            survey_link: link,
            qrCode: qrLink
        }
    }


    get id() {
        return this.obj._id;
    }
    set id(value) {
        this.obj._id = value;
    }

    get title() {
        return this.obj._title;
    }
    set title(value) {
        this.obj._title = value;
    }

    get quesID() {
        return this.obj._quesID;
    }
    set quesID(value) {
        this.obj._quesID = value;
    }

    get quesTitle() {
        return this.obj._quesTitle;
    }
    set quesTitle(value) {
        this.obj._quesTitle = value;
    }

    get quesType() {
        return this.obj._quesType;
    }
    set quesType(value) {
        this.obj._quesType = value;
    }

    get quesImg() {
        return this.obj._quesImg;
    }
    set quesImg(value) {
        this.obj._quesImg = value;
    }

    get answer() {
        return this.obj._answer;
    }
    set answer(value) {
        this.obj._answer = value;
    }

    get ansCounter() {
        return this.obj._ansCounter;
    }
    set ansCounter(value) {
        this.obj._ansCounter = value;
    }

    get sDate() {
        return this.obj._sDate;
    }
    set sDate(value) {
        this.obj._sDate = value;
    }

    get eDate() {
        return this.obj._eDate;
    }
    set eDate(value) {
        this.obj._eDate = value;
    }

    get status() {
        return this.obj._status;
    }
    set status(value) {
        this.obj._status = value;
    }

    get link() {
        return this.obj._link;
    }
    set link(value) {
        this.obj._link = value;
    }

    get qrLink() {
        return this.obj._qrLink;
    }
    set qrLink(value) {
        this.obj._qrLink = value;
    }

    get obj() {
        return this.obj._obj;
    }
    set obj(value) {
        this.obj._obj = value;
    }
}

module.exports = Survey;