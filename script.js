

if (!localStorage.getItem("jobs")) {

    const sampleJobs = [

        {
            title: "Software Developer (CSE)",
            desc: "Work on full stack web applications.",
            requirements: "B.Tech CSE | JavaScript | React | Node.js | Problem Solving",
            approved: true,
            applicants: []
        },

        {
            title: "Cyber Security Analyst (IT)",
            desc: "Monitor and secure enterprise systems.",
            requirements: "B.Tech IT | Networking | Ethical Hacking | Linux | Firewalls",
            approved: true,
            applicants: []
        },

        {
            title: "Data Analyst (CSE/IT)",
            desc: "Analyze and visualize business data.",
            requirements: "Python | SQL | Power BI | Statistics | Excel",
            approved: true,
            applicants: []
        },

        {
            title: "HR Executive (Management)",
            desc: "Handle recruitment and employee engagement.",
            requirements: "MBA HR | Communication | Recruitment Process | Leadership",
            approved: true,
            applicants: []
        },

        {
            title: "Business Analyst (Management)",
            desc: "Bridge gap between business & technology.",
            requirements: "MBA | Data Analysis | Presentation Skills | Strategic Thinking",
            approved: true,
            applicants: []
        }

    ];

    localStorage.setItem("jobs", JSON.stringify(sampleJobs));
}



// LOGIN


function login() {
    const role = document.getElementById("role").value;
    const username = document.getElementById("username").value;

    if (username === "") {
        alert("Enter name");
        return;
    }

    localStorage.setItem("role", role);
    localStorage.setItem("username", username);

    if (role === "admin") {
        window.location = "admin.html";
    } else {
        window.location = "dashboard.html";
    }
}



// LOGOUT


function logout() {
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    window.location = "index.html";
}


// DASHBOARD LOAD


if (window.location.pathname.includes("dashboard.html")) {

    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");

    document.getElementById("welcome").innerText = "Welcome, " + username;

    if (role === "recruiter") {
        document.getElementById("recruiterSection").classList.remove("hidden");
    }

    if (role === "applicant") {
        document.getElementById("applicantSection").classList.remove("hidden");
    }

    displayJobs();
}


// ===============================
// SAVE RESUME
// ===============================

function saveResume() {
    const file = document.getElementById("resumeUpload").files[0];

    if (file) {
        localStorage.setItem("resume", file.name);
        alert("Resume Saved Successfully!");
    }
}



// POST JOB (Recruiter)


function postJob() {

    const title = document.getElementById("jobTitle").value;
    const desc = document.getElementById("jobDesc").value;

    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    jobs.push({
        title,
        desc,
        requirements: "To be added by Recruiter",
        approved: false,
        applicants: []
    });

    localStorage.setItem("jobs", JSON.stringify(jobs));

    alert("Job submitted for admin approval!");
}


// DISPLAY JOBS


function displayJobs() {

    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");
    const jobList = document.getElementById("jobList");

    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    jobList.innerHTML = "";

    jobs.forEach((job, index) => {

        if (job.approved) {

            let div = document.createElement("div");
            div.className = "job-card";

            div.innerHTML = `
                <h3>${job.title}</h3>
                <p><strong>Description:</strong> ${job.desc}</p>
                <p><strong>Requirements:</strong> ${job.requirements}</p>
                ${role === "applicant" ?
                `<button onclick="applyJob(${index})">Apply</button>
                 <button onclick="withdrawJob(${index})">Withdraw</button>` : ""}
            `;

            jobList.appendChild(div);
        }
    });
}


// APPLY JOB


function applyJob(index) {

    const username = localStorage.getItem("username");
    let jobs = JSON.parse(localStorage.getItem("jobs"));

    if (!jobs[index].applicants.includes(username)) {

        jobs[index].applicants.push(username);
        localStorage.setItem("jobs", JSON.stringify(jobs));

        alert("Applied Successfully!");
    } else {
        alert("You already applied!");
    }
}


// WITHDRAW JOB


function withdrawJob(index) {

    const username = localStorage.getItem("username");
    let jobs = JSON.parse(localStorage.getItem("jobs"));

    jobs[index].applicants =
        jobs[index].applicants.filter(u => u !== username);

    localStorage.setItem("jobs", JSON.stringify(jobs));

    alert("Application Withdrawn!");
}



// ADMIN PAGE


if (window.location.pathname.includes("admin.html")) {

    const approvalList = document.getElementById("approvalList");
    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    approvalList.innerHTML = "";

    jobs.forEach((job, index) => {

        if (!job.approved) {

            let div = document.createElement("div");
            div.className = "job-card";

            div.innerHTML = `
                <h3>${job.title}</h3>
                <p>${job.desc}</p>
                <button onclick="approveJob(${index})">Approve</button>
            `;

            approvalList.appendChild(div);
        }
    });
}


// ===============================
// APPROVE JOB
// ===============================

function approveJob(index) {

    let jobs = JSON.parse(localStorage.getItem("jobs"));

    jobs[index].approved = true;

    localStorage.setItem("jobs", JSON.stringify(jobs));

    location.reload();
}
