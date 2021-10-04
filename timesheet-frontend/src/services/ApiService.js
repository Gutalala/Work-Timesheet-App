import axios from 'axios';



export function fetchTimesheetTemplate(){
    return axios.get('https://api.npoint.io/3875a568da79eafd2aa0')
}

export function fetchAllTimesheets(userID){
    return axios.get('http://localhost:9000/timesheet/timesheets/' + userID)

}

// send a new template to set as default in the future
export function postTemplate(userID, template){
    return axios.post('http://localhost:10000/timesheet/template/' + userID, template)

}


export function getProfile(userID) {
    return axios.get('http://localhost:11000/profile/' + userID)

}

export function postProfile(contact){
    return axios.post('http://localhost:11000/profile/61101603d0ca8600cd04d961', contact)
}

//update the current weekly timesheet
export function postWeeklyTimesheet(userID, weeklyTimesheet){
    return axios.post('http://localhost:10000/timesheet/timesheets/' + userID, weeklyTimesheet)
}



// For Summary Section to get a list of WeeklyTimesheets summary
export function fetchWeeklyTimesheets(){
    return axios.get('https://api.npoint.io/626ec669cd7ed6db4711')

}


// For uploading file
export function uploadFile(file, weekEnding){
    let formData = new FormData();
    formData.append("file", file);
    formData.append("userId", window.sessionStorage.getItem("userID"));
    formData.append("weekEnding", weekEnding);
    console.log(formData);
    return axios.post('http://localhost:9000/timesheet/fileUpload', formData, {
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    })
}


export function login(loginInfo) {
    return axios.post('http://localhost:10203/auth/login', loginInfo, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With"
        }
    })
}

export function goLogin() {
    console.log("go to log in")
     window.location.href = "http://localhost:3001"
}

export function uploadAvatar(file){
    let formData = new FormData();
    formData.append("file", file);
    formData.append("userId", window.sessionStorage.getItem("userID"));
    console.log(formData);
    return axios.post('http://localhost:9000/profile/fileUpload', formData, {
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    })
}


