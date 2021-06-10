class LoanApplication {
    Id = create_UUID();
    ApplicantName;
    ApplicantDateOfBirth;
    ApplicantAnnualIncome;
    Factors = [];
    LoanPurpose;
    LoanAmount;
}

var LoanApplicationList = [];

//fires when the page loads
window.onload = function () {

    initializeLoans();

    bindLoansToDropDown();
}

function initializeLoans() {

    var la1 = new LoanApplication();
    la1.ApplicantName = "Mr. John worker";
    la1.ApplicantDateOfBirth = new Date(1983, 2, 1);
    la1.ApplicantAnnualIncome = 48000;
    la1.Factors = [false, true, true, false];
    la1.LoanPurpose = "I want to build a new house with the loan";
    la1.LoanAmount = 150000;

    LoanApplicationList[0] = la1;

    var la2 = new LoanApplication();
    la2.ApplicantName = "Miss Michelle Smartypants M.D. ";
    la2.ApplicantDateOfBirth = new Date(1976, 12, 14);
    la2.ApplicantAnnualIncome = 198050;
    la2.Factors = [true, true, true, false];
    la2.LoanPurpose = "My partner needs the loan to buy new equipment for our medical practice";
    la2.LoanAmount = 4800;

    LoanApplicationList[1] = la2;

    var la3 = new LoanApplication();
    la3.ApplicantName = "Mrs. Debbie Learner";
    la3.ApplicantDateOfBirth = new Date(1952, 6, 20);
    la3.ApplicantAnnualIncome = 21000;
    la3.Factors = [true, true, true, true];
    la3.LoanPurpose = "Go on a cruise holiday";
    la3.LoanAmount = 6000;

    LoanApplicationList[2] = la3;
}

function create_UUID() {
    var dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function bindLoansToDropDown() {

    var dropDown = document.getElementById("loanApplications");

    dropDown.options.length = 0;

    var el = document.createElement("option");
    el.textContent = "...Select an application...";
    dropDown.appendChild(el);


    for (var i = 0; i < LoanApplicationList.length; i++) {
        let la = LoanApplicationList[i];

        let el = document.createElement("option");
        el.textContent = "Application of " + la.ApplicantName;
        el.value = la.Id.toString();
        dropDown.appendChild(el);
    }
}

function loadApplication() {

    var dropDown = document.getElementById("loanApplications");

    var la = findLoanApplicationByName(dropDown.value);

    if (la != undefined) {

        var [isEmployed, hasKids, hasLoans, hasCreditcards] = la.Factors;

        document.getElementById("inputName").value = la.ApplicantName;
        document.getElementById("inputDoBMonth").value = la.ApplicantDateOfBirth.getMonth() + 1;
        document.getElementById("inputDoBDay").value = la.ApplicantDateOfBirth.getDate();
        document.getElementById("inputDoBYear").value = la.ApplicantDateOfBirth.getFullYear();
        document.getElementById("inputAnnualIncome").value = la.ApplicantAnnualIncome;
        document.getElementById("inputAnnualIncome").value = la.ApplicantAnnualIncome;
        document.getElementById("IsEmployed").checked = isEmployed;
        document.getElementById("HasKids").checked = hasKids;
        document.getElementById("HasLoans").checked = hasLoans;
        document.getElementById("HasCreditcards").checked = hasCreditcards;
        document.getElementById("inputLoanPurpose").value = la.LoanPurpose;
        document.getElementById("inputLoanAmount").value = la.LoanAmount;

        var riskLabel = document.getElementById("riskSummary");
        riskLabel.style.display = "block";
        riskLabel.innerHTML = generateRickProfile(la);

    }
}

function findLoanApplicationByName(name) {
    for (var i = 0; i < LoanApplicationList.length; i += 1) {
        if (LoanApplicationList[i]["Id"] === name) {
            return LoanApplicationList[i];
        }
    }
    return undefined;
}

function saveApplication() {

    if (validateApplication()) {

        var newLa = getLoanApplicationDataFromInputs();

        var riskLabel = document.getElementById("riskSummary");
        riskLabel.style.display = "block";
        riskLabel.innerText = generateRickProfile(newLa);

        LoanApplicationList.push(newLa);

        bindLoansToDropDown();

    } else {
        document.getElementById("riskSummary").style.display = "none";
    }
}

function clearApplication() {
    document.getElementById("inputName").value = "";
    document.getElementById("inputDoBMonth").value = "";
    document.getElementById("inputDoBDay").value = "";
    document.getElementById("inputDoBYear").value = "";
    document.getElementById("inputAnnualIncome").value = "";
    document.getElementById("IsEmployed").checked = false;
    document.getElementById("HasKids").checked = false;
    document.getElementById("HasLoans").checked = false;
    document.getElementById("HasCreditcards").checked = false;
    document.getElementById("inputLoanPurpose").value = "";
    document.getElementById("inputLoanAmount").value = "";

    hideValidators();
}

function hideValidators() {
    document.getElementById("inputNameValidation").style.display = "none";
    document.getElementById("inputDoBValidation").style.display = "none";
    document.getElementById("inputAnnualIncomeValidation").style.display = "none";
    document.getElementById("inputLoanPurposeValidation").style.display = "none";
    document.getElementById("inputLoanAmountValidation").style.display = "none";
    document.getElementById("riskSummary").style.display = "none";
}

function getLoanApplicationDataFromInputs() {

    var la = new LoanApplication();

    la.ApplicantName = document.getElementById("inputName").value;

    var month = document.getElementById("inputDoBMonth").value;
    var day = document.getElementById("inputDoBDay").value;
    var year = document.getElementById("inputDoBYear").value;

    var isEmployed = document.getElementById("IsEmployed").checked;
    var hasKids = document.getElementById("HasKids").checked;
    var hasLoans = document.getElementById("HasLoans").checked;
    var hasCreditcards = document.getElementById("HasCreditcards").checked;


    la.Factors[0] = isEmployed;
    la.Factors[1] = hasKids;
    la.Factors[2] = hasLoans;
    la.Factors[3] = hasCreditcards;

    if (month != "" && day != "" && year != "") {
        la.ApplicantDateOfBirth = new Date(year, month, day);
    }

    la.ApplicantAnnualIncome = document.getElementById("inputAnnualIncome").value;
    la.LoanPurpose = document.getElementById("inputLoanPurpose").value;
    la.LoanAmount = document.getElementById("inputLoanAmount").value;

    return la;
}

function validateApplication() {

    var valid = true;

    var la = getLoanApplicationDataFromInputs();

    if (la.ApplicantName == "") {
        document.getElementById("inputNameValidation")
            .style.display = "block";

        valid = false;
    } else {
        document.getElementById("inputNameValidation")
            .style.display = "none";
    }

    if (la.ApplicantDateOfBirth == undefined) {
        document.getElementById("inputDoBValidation")
            .style.display = "block";

        valid = false;
    } else {
        document.getElementById("inputDoBValidation")
            .style.display = "none";
    }

    if (la.ApplicantAnnualIncome == "") {
        document.getElementById("inputAnnualIncomeValidation")
            .style.display = "block";

        valid = false;
    } else {
        document.getElementById("inputAnnualIncomeValidation")
            .style.display = "none";
    }

    if (la.LoanPurpose == "") {
        document.getElementById("inputLoanPurposeValidation")
            .style.display = "block";

        valid = false;
    } else {
        document.getElementById("inputLoanPurposeValidation")
            .style.display = "none";
    }

    if (la.LoanAmount == "") {
        document.getElementById("inputLoanAmountValidation")
            .style.display = "block";

        valid = false;
    } else {
        document.getElementById("inputLoanAmountValidation")
            .style.display = "none";
    }

    return valid;
}

function generateRickProfile(la) {
    var risk = 3;

    var nameAndTitle = la.ApplicantName.trim().toLowerCase();

    let dr = nameAndTitle.startsWith("dr");
    let phd = nameAndTitle.startsWith("phd");
    let phd2 = nameAndTitle.startsWith("ph.d");

    let md = nameAndTitle.endsWith("md");
    let md2 = nameAndTitle.endsWith("m.d");
    let md3 = nameAndTitle.endsWith("m.d.");

    if (dr || phd || phd2 || md || md2 || md3) {

        risk = risk - 1;
    }

    var age = new Date().getFullYear() -
        la.ApplicantDateOfBirth.getFullYear();

    if (age > 60) {
        risk = risk + 2;
    }

    var loanRatio = la.ApplicantAnnualIncome / la.LoanAmount;
    if (loanRatio < 1) {
        risk = risk + 3;
    }
    if (loanRatio > 10) {
        risk = risk + 2;
    }
    if (loanRatio > 20) {
        risk = risk + 1;
    }
    if (loanRatio > 30) {
        risk = risk - 1;
    }

    if (la.Factors[2] == true || la.Factors[3] == true) {
        //risk increases when the applicant has other 
        //loans or credit cards
        risk = risk + 1;
    }

    var purpose = la.LoanPurpose.trim().toLowerCase();

    let house = purpose.includes("house");
    let holiday = purpose.includes("holiday");
    let vacation = purpose.includes("vacation");
    let business = purpose.includes("business");

    if (house) {
        //the loan will be used for a house or building project
        risk = risk + 2;
    }

    if (holiday || vacation) {
        //the loan will be used for a holiday
        risk = risk + 3;
    }

    if (business) {
        //the loan will be used for a business
        risk = risk + 1;
    }


    var reviewText = "";

    if (age < 18) {
        reviewText = "not be reviewed, because you have to be 18 years or older";
    } else {
        reviewText = "be reviewed";
    }

    var riskProfile = "";

    if (risk < 2) {
        riskProfile = "very low";
    } else if (risk < 5) {
        riskProfile = "low";
    } else if (risk < 8) {
        riskProfile = "medium";
    } else if (risk < 12) {
        riskProfile = "high";
    }

    var applicationCode = String.raw`\t${createApplicationId()}`;

    var summaryText = hightlightText`Dear ${la.ApplicantName}, <br>
    your application for ${'$' + la.LoanAmount}, will ${reviewText}. <br>
    Your risk profile is ${riskProfile}. <br>
    Your unique application code is ${applicationCode}`;

    return summaryText;
}

function hightlightText(strings, ...values) {
    let str = '';
    for (var i = 0; i < strings.raw.length; i++) {
        if (i > 0) {
            str += `<b>${values[i - 1]}</b>`;
        }
        str += strings.raw[i];
    }
    return str;
}

function createApplicationId() {
    var result = '';
    var characters = 'ABCDEUVYZabcdrswxyz01789/\\#@$%()^!';
    var charactersLength = characters.length;
    for (var i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
