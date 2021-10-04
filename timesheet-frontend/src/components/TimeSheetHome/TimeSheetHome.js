import {React, useState, useEffect} from 'react';
import { TextField, Checkbox, Button, makeStyles, TableBody, Table, TableCell, TableContainer, TableHead, TableRow, Paper,
    InputLabel, MenuItem , FormControl , Select, Grid } from '@material-ui/core';
// import { KeyboardTimePicker , MuiPickersUtilsProvider } from "@material-ui/pickers";
import { connect } from 'react-redux';
import * as actionTypes from '../../action/actionTypes';
import TimeSheetHomeCSS from './TimeSheetHome.module.css';
import * as ApiService from '../../services/ApiService';
import { format, set } from 'date-fns';
import { getUserProfile } from '../../action/action'


function TimeSheetHome(props) {

    const [isValid, setValid] = useState(true);
    const [newTimesheet, setNewTimesheet] = useState(props.selectedWeek);
    const [isApproved, setApproved] = useState(false);
    const [floatingDayCheck, setFloatingDayCheck] = useState(true);
    const [vacationCheck, setVacationCheck] = useState(true);
    const [selectedDocument, setDocument] = useState(null);
    const [userId, setUserId] = useState(window.sessionStorage.getItem("userID"));
    const [timesheetList, setTimesheetList] = useState([]);
    const [selectedWeek, setSelectedWeek] = useState("");
    const [floatingDayCount, setFloatingCount] = useState(0);

    useEffect(() => {
        
        const getWeeklyTimesheets = () => {
            // if (props.timesheetList.length === 0){
            //     ApiService.fetchAllTimesheets(userId)
            //     .then((response)=>{
            //         props.getWeeklyTimesheets(response.data[22].weeklyTimesheets);
            //         setNewTimesheet(props.weeklyTimesheets);
            //     })
            //     setTimesheetList(props.timesheetList);
            // }
            // else {
                setTimesheetList(props.timesheetList);
                // setNewTimesheet(props.timesheetList[22].weeklyTimesheets);
            // }

        }
        getWeeklyTimesheets();

        console.log(newTimesheet.approvedStatus);
        if (newTimesheet.approvedStatus === "Approved"){
            setApproved(true);
        }
        if (props.profile.remainingFloatingDay == 0){
            setFloatingDayCheck(false);
        }
        if (props.profile.remainingVacationDay == 0){
            setVacationCheck(false);
        }
        // if (props.profile.remainingFloatingDay <= floatingDayCount){
        //     setFloatingDayCheck(false);
        // }
        
        const calculateTotalHours = ()=>{
            let totalBillingHours = 0;
            let totalCompensatedHours = 0;
            let totalPaidOffDay = 0;
            newTimesheet.dailyTimesheets && newTimesheet.dailyTimesheets.forEach(element => {
                let timeStart = new Date('01/07/2007 ' + element.startingTime);
                let timeEnd = new Date('01/07/2007 ' + element.endingTime);
                let hourDiff = (timeEnd - timeStart) / 60 / 60 / 1000;
                hourDiff = hourDiff.toFixed(2);
                if (element.isFloatingDay === true){
                    totalPaidOffDay++;
                }
                if (element.isVacationDay === true){
                    totalPaidOffDay++;
                }
                if (element.isHoliday === true){
                    totalPaidOffDay++;
                }
                totalBillingHours = totalBillingHours + parseFloat(hourDiff);
                totalCompensatedHours = totalBillingHours + totalPaidOffDay*8;
            });
            console.log(totalBillingHours);
            console.log(totalCompensatedHours);
            setNewTimesheet({
                ...newTimesheet,
                totalBillingHours: totalBillingHours.toFixed(2),
                totalCompensatedHours: totalCompensatedHours.toFixed(2)});
        }
        props.getUserProfile(userId);
        calculateTotalHours();

    },[newTimesheet.weekEnding, newTimesheet.dailyTimesheets])

    function postTemplate(){
        console.log("Sending Request");
        ApiService.postTemplate(userId, newTimesheet.dailyTimesheets).then((response)=> console.log(response));
    }

    function postWeeklyTimesheet(){
        ApiService.postWeeklyTimesheet(userId, newTimesheet).then((response)=> console.log(response));
        // console.log(props.profile.remainingFloatingDay);
        // console.log(floatingDayCount);
    }

    const uploadDocument = () => {
        console.log(newTimesheet);
        ApiService.uploadFile(selectedDocument, newTimesheet.weekEnding);
    }

    const handleFileInput = (e) => {
        setDocument(e.target.files[0]);
    }


    const useStyles = makeStyles((theme)=>({
        table: {
          minWidth: 650,
        },
        formControl: {
            margin: theme.spacing(0),
            minWidth: 220,
        },
        formControlMed: {
            margin: theme.spacing(1),
            minWidth: 300,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        label: {
            backgroundColor: "white"
        }
      }));
    const classes = useStyles();

    //setsubmissionstatus

    function totalHoursCalc(startingTime, endingTime){
        var timeStart = new Date('01/07/2007 ' + startingTime);
        var timeEnd = new Date('01/07/2007 ' + endingTime);
        var hourDiff = (timeEnd - timeStart) / 60 / 60 / 1000;
        hourDiff = hourDiff.toFixed(2);
        if (hourDiff >= 0){
            return  (
                <span>
                   {hourDiff}
               </span>)
        }
        else {
            return (
            <span>
                   Invalid
            </span>
            )
        }
    }

    function handleStartingTimeChange(index, e){
        let changedTimesheet = [...newTimesheet.dailyTimesheets];
        let row = {...changedTimesheet[index]};
        row.startingTime = e.target.value;
        var timeStart = new Date('01/07/2007 ' + row.startingTime);
        var timeEnd = new Date('01/07/2007 ' + row.endingTime);
        if (timeEnd < timeStart)
            setValid(false);
        else 
            setValid(true);
        changedTimesheet[index] = row;
        setNewTimesheet({
            ...newTimesheet,
            dailyTimesheets: changedTimesheet});
    }

    function handleEndingTimeChange(index, e){
        console.log(e.target.value);
        let changedTimesheet = [...newTimesheet.dailyTimesheets];
        let row = {...changedTimesheet[index]};
        row.endingTime = e.target.value;
        var timeStart = new Date('01/07/2007 ' + row.startingTime);
        var timeEnd = new Date('01/07/2007 ' + row.endingTime);
        if (timeEnd < timeStart)
            setValid(false);
        else 
            setValid(true);
        changedTimesheet[index] = row;
        setNewTimesheet({
            ...newTimesheet,
            dailyTimesheets: changedTimesheet});
    }

    function handleFloatingDayChange(index, e){
        let changedTimesheet = [...newTimesheet.dailyTimesheets];
        let row = {...changedTimesheet[index]};
        row.floatingDay = e.target.checked;
        changedTimesheet[index] = row;
        if (e.target.checked === true){
            setFloatingCount(floatingDayCount+1);
        }
        else if (e.target.checked === false){
            setFloatingCount(floatingDayCount-1);
        }

        setNewTimesheet({
            ...newTimesheet,
            dailyTimesheets: changedTimesheet});
    }

    function handleVacationChange(index, e){
        let changedTimesheet = [...newTimesheet.dailyTimesheets];
        let row = {...changedTimesheet[index]};
        row.vacation = e.target.checked;
        changedTimesheet[index] = row;
        setNewTimesheet({
            ...newTimesheet,
            dailyTimesheets: changedTimesheet});
    }

    function handleHolidayChange(index, e){
        let changedTimesheet = [...newTimesheet.dailyTimesheets];
        let row = {...changedTimesheet[index]};
        row.holiday = e.target.checked;
        changedTimesheet[index] = row;
        setNewTimesheet({
            ...newTimesheet,
            dailyTimesheets: changedTimesheet});
    }

    function setDocumentType(e){
        let newDocument = newTimesheet.document;
        newDocument.type = e.target.value;
        setNewTimesheet({
            ...newTimesheet,
            document: newDocument
        });
    }

    // 2021-05-12T00:00:000Z

    function dateFormatter(date){
        console.log(date);
        return format(new Date(date), 'yyyy/MM/dd')
    }

    function weekEndingFormatter(weekEnding){

        return format(new Date(weekEnding), 'dd MMMM yyyy')
    }


    function handleWeekChange(e){
        setSelectedWeek(e.target.value);
        const selectedWeek = timesheetList.filter(obj => {
            return obj.weeklyTimesheets.weekEnding === e.target.value;
        })
        
        setNewTimesheet(selectedWeek[0].weeklyTimesheets);
        console.log(selectedWeek[0].weeklyTimesheets);
    }

    return (
        <div className={TimeSheetHomeCSS.container}>
            <div>
                <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                >
                <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label" shrink={true}>Week Ending</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        defaultValue={selectedWeek}
                        onChange={(e)=> handleWeekChange(e)}
                        // value={selectedWeek}
                        // displayEmpty
                        // renderValue={(value)=> { 
                        //     if (value === undefined) 
                        //         return newTimesheet.weekEnding && weekEndingFormatter(newTimesheet.weekEnding)
                        //     else
                        //         return value
                        // }}
                        >
                        {timesheetList && timesheetList.map((week, index) => (
                            <MenuItem value={week.weeklyTimesheets.weekEnding}>{weekEndingFormatter(week.weeklyTimesheets.weekEnding)}</MenuItem>
                        ))}
                        
                    </Select>
                </FormControl>
                <TextField
                    id="filled-disabled"
                    label="Total Billing Hours"
                    value={newTimesheet.totalBillingHours}
                    InputLabelProps={{
                        shrink: true,
                      }}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    />
                <TextField
                    id="filled-read-only-input"
                    label="Total Compensated Hours"
                    value={newTimesheet.totalCompensatedHours}
                    InputLabelProps={{
                        shrink: true,
                      }}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />
            </Grid>
            </div>
            <br></br>
            <br></br>
            <Grid container direction="row" alignItems="center" justifyContent="flex-end">
                    <Button variant="contained" color="primary" onClick={postTemplate} disabled={!isValid}>
                        Set Default
                    </Button>
            </Grid>
            <br></br>
            <br></br>
            <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Day</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Starting Time</TableCell>
                        <TableCell align="center">Ending Time</TableCell>
                        <TableCell align="center">Total Hours</TableCell>
                        <TableCell align="center">Floating Day</TableCell>
                        <TableCell align="center">Holiday</TableCell>
                        <TableCell align="center">Vacation Day</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {newTimesheet.dailyTimesheets && newTimesheet.dailyTimesheets.map((row, index) => (
                        <TableRow key={row.day}>
                        <TableCell component="th" scope="row">
                            {row.day}
                        </TableCell>
                        <TableCell align="center">{dateFormatter(row.date)}
                        </TableCell>
                        <TableCell align="center">
                        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
                        <TextField
                                    id="time"
                                    type="time"
                                    defaultValue={row.startingTime}
                                    onChange={(e)=>handleStartingTimeChange(index, e)}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                    step: 300, // 5 min
                                    }}
                                    disabled={isApproved}
                            />
                        {/* <KeyboardTimePicker value={row.startingTime} mask="__:__ _M" onChange={(e)=>handleStartingTimeChange(index, e)} minutesStep={30} /> */}
                        {/* </MuiPickersUtilsProvider> */}
                        </TableCell>
                        <TableCell align="center">
                            <TextField
                                    id="time"
                                    type="time"
                                    defaultValue={row.endingTime}
                                    onChange={(e)=>handleEndingTimeChange(index, e)}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                    step: 300, // 5 min
                                    }}
                                    disabled={isApproved}
                            />
                            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker mask="__:__ _M" value={row.endingTime} onChange={(e)=>handleEndingTimeChange(index, e)} minutesStep={30} />
                            </MuiPickersUtilsProvider> */}
                        </TableCell>
                        <TableCell align="center">
                                {/* {newTimesheet.totalBillingHours} */}
                                {totalHoursCalc(row.startingTime, row.endingTime)}
                            
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox
                                checked={row.floatingDay}
                                onChange={(e)=>handleFloatingDayChange(index, e)}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                disabled={row.holiday || row.vacation || isApproved || !floatingDayCheck}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox
                                checked={row.holiday}
                                onChange={(e)=>handleHolidayChange(index, e)}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                disabled={true}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <Checkbox
                                checked={row.vacation}
                                onChange={(e)=>handleVacationChange(index, e)}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                disabled={row.holiday || row.floatingDay || isApproved || !vacationCheck}
                            />
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
            <br></br>
            <div>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={10}
                >
                <Grid item>
                
                    <TextField select variant="outlined" className={classes.formControlMed} defaultValue="" placeholder="hello" 
                        onChange={(e)=>setDocumentType(e)} label="Document Approval Status" InputLabelProps={{
                            classes: {
                                root: classes.label
                            }
                        }}
                    >
                        <MenuItem value="approved timesheet">Approved Timesheet</MenuItem>
                        <MenuItem value="unapproved timesheet">Unapproved Timesheet</MenuItem>
                    
                    </TextField>
                </Grid>
                
                <Grid item>
                        <input type="file" onChange={handleFileInput} accept=".pdf, .doc, .docx, .jpeg, .xlsx, .jpg"/>
                    
                </Grid>
                </Grid>
                <Grid container direction="row" alignItems="center" justifyContent="flex-end">
                    <Button variant="contained" color="primary" onClick={postWeeklyTimesheet} disabled={!isValid}>
                        Save
                    </Button>
                </Grid>
            </div>
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        curr_timesheet: state.curr_timeSheet,
        timesheetTemplate: state.timesheetTemplate,
        weeklyTimesheets: state.weeklyTimesheets,
        timesheetList: state.summaryTimesheets,
        profile : state.profile,
        selectedWeek: state.selectedWeek
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // postTemplate: () => dispatch({type: actionTypes.POST_TIMESHEET_TEMPLATE}),
        // editTimesheet: (payload) => dispatch({type: actionTypes.EDIT_TIMESHEET, payload}),
        // getWeeklyTimesheets: (payload) => dispatch({type: actionTypes.GET_WEEKLYTIMESHEETS, payload}),
        getUserProfile : (userID) => dispatch(getUserProfile(userID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeSheetHome);
