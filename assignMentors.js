const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
app.use(express.json())

let students = []
let mentors = []

app.listen(3000)

//Display all students
app.get("/students", function (req, res) {
    res.json(students)
})

//Add students 
app.post("/student", function (req, res) {
    req.body.id = students.length + 1;
    students.push(req.body);
    res.json({
        "message": "Done"
    })
})

//Display all mentors
app.get("/mentors", function (req, res) {
    res.json(mentors)
})

//Add Mentor
app.post("/mentor", function (req, res) {
    req.body.id = mentors.length + 1;
    mentors.push(req.body);
    res.json({
        "message": "Done"
    })
})

//Api to create a student to mentor
app.put("/mentor/:id", function (req, res) {
    mentorId = req.params.id;
    updateData = req.body;
    // console.log(updateData);
    let mentorIndex = mentors.findIndex((obj) => obj.id == mentorId)
    let mentorData = mentors[mentorIndex];
    // console.log(mentorData)
    //Update the particular key
    if (mentorData) {
        Object.keys(updateData).forEach((keyItem) => {
            mentorData[keyItem] = updateData[keyItem]
        })

        mentors[mentorIndex] = mentorData;
        let tempAdd = mentors[mentorIndex].studentname;
        let studentIndex = students.findIndex((obj) => obj.studentname == tempAdd)
        // console.log(studentIndex);
        // console.log(students[studentIndex])
        let studentData = students[studentIndex];
        // console.log(studentData.studentname);
        studentData["mentorname"] = mentors[mentorIndex].mentorname;

        res.json({
            "message": "Updated Successfully"
        })
    } else {
        res.json({
            "message": "No User Found"
        })
    }
})

//Assign mentor to student
app.put("/student/:id", function (req, res) {
    studentId = req.params.id;
    updateData = req.body;
    // console.log(updateData);
    let studentIndex = students.findIndex((obj) => obj.id == studentId)
    let studentData = students[studentIndex];
    // console.log(mentorData)
    //Update the particular key
    if (studentData) {
        Object.keys(updateData).forEach((keyItem) => {
            studentData[keyItem] = updateData[keyItem]
        })

        students[studentIndex] = studentData;
        let tempAdd = students[studentIndex].mentorname;
        let mentorIndex = mentors.findIndex((obj) => obj.mentorname == tempAdd)
        // console.log(studentIndex);
        // console.log(students[studentIndex])
        let mentorData = mentors[mentorIndex];
        // console.log(studentData.studentname);
        mentorData["studentname"] = students[studentIndex].studentname;

        res.json({
            "message": "Updated Successfully"
        })
    } else {
        res.json({
            "message": "No User Found"
        })
    }
})

//Display all students for mentor 
app.get("/mentorstudent/:id",function(req,res){
    let mentorId = req.params.id;
    let mentor = mentors.find((obj)=>obj.id == mentorId);
    if (mentor) {
        res.json(mentor.studentname)
    } else {
        res.json({
            "message": "There is no user"
        })
    }
})