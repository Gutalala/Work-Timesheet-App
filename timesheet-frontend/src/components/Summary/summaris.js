import { React, Component} from 'react';
import { connect } from 'react-redux';
import { getTimesheetSummary, getUserProfile } from '../../action/action'
import { Link } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';
import { convertISO_to_Date } from '../../services/dateConverter';
import { Tooltip } from '@material-ui/core';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import { SummaryCss} from './summary.module.css';
import * as actionTypes from '../../action/actionTypes';


class Summaries extends Component {

    constructor(props) {
        super(props);
        this.props.getTimesheetSummary();
        this.state = {
            userID : window.sessionStorage.getItem("userID"),
            currentWeeklyTimesheets: [],
            tableSize: 5,
            showAll: false,
            showSubmissionTag: false,
            floatingDayUsed: 0,
            vacationDayUsed: 0,
            remainingFloatingDay: 0,
            remainingVacationDay: 0,
            pageSize: 10,
            currentPage:1
        }
    }

    async componentDidMount() {
        await this.props.getTimesheetSummary(this.state.userID)
        await this.props.getUserProfile(this.state.userID)
        // this.setState({ currentWeeklyTimesheets: this.props.timesheetSummaries.slice(0, this.state.tableSize) });
    } 

    changeToShowMoreOrLess = () => {
        if (this.state.showAll === false) {
            this.setState({ showAll: true });
            this.setState({ currentWeeklyTimesheets: this.props.timesheetSummaries});
        }
        if (this.state.showAll === true) {
            this.setState({ showAll: false });
            this.setState({ currentWeeklyTimesheets: this.props.timesheetSummaries.slice(0, this.state.tableSize) });
        }     
    };

    showMoreTag = () => {
        if (this.state.showAll === true) return "Show Less"
        return "Show More"
    }

    optionTags = (week) => {
        let selectedWeek = convertISO_to_Date(week.weeklyTimesheets.weekEnding)
        let option = week.weeklyTimesheets.approvedStatus === "Approved" ? "view" : "edit"
        let url = "timesheet";

        return <Link to={ url} onClick={()=> this.setSelectedWeek(week)}>{ option}</Link>
    }

    setSelectedWeek = (week) => {
        let selectedWeek = week.weeklyTimesheets;
        this.props.setSelectedWeek(selectedWeek);
        console.log(selectedWeek);
    }

    tagTextSubmission = (week) => {
        const status = week.weeklyTimesheets.submissionStatus; 
        const fileType = week.weeklyTimesheets.document.type;
        if (status !== 'Not Started' && fileType !== 'Approved') {
            return 'Items due: Proof of Approved TimeSheet'
        } 
        return 'Approval denied by Admin, please contact your HR manager'
    }

    showComment = (week) => {
        let floatingDayUsed = week.weeklyTimesheets.floatingDayUsed;
        let vacationDayUsed = week.weeklyTimesheets.vacationDayUse; 
        return <table><tbody>
            <tr>
                {floatingDayUsed != 0 && floatingDayUsed + " Floating Day Required"}
                </tr> 
            <tr>
                {vacationDayUsed != 0 && vacationDayUsed + " Vacation Day Required"}
            </tr>
        </tbody></table>
    } 

    tagTextComment = (week) => {
        
        const remainingFloatingDay = this.props.profile.remainingFloatingDay;
        const remainingVacationDay = this.props.profile.remainingVacationDay;
        return <td>
            {remainingFloatingDay != 0 && "Total floating days left in 2021 : " + remainingFloatingDay + " days\n"} <div></div>
            {remainingVacationDay != 0 && "Total vacation days left in 2021 : " + remainingVacationDay + " days"}
        </td>
    }

    showCommentFloatingDay = (week) => {
        return <div>
            {this.showComment(week)}
            {this.showComment(week) !== '' &&
                <Tooltip title={this.tagTextComment(week)}>
                    <span>
                        <FaInfoCircle />
                    </span> 
                </Tooltip>
            }
        </div>    
    }

    handlePageChange = (page) => {
        this.setState({currentPage:page})
    }


    render() {      
        // console.log("before render")
        // console.log(this.props)
        
        const { length: count } = this.props.timesheetSummaries;
        const { pageSize, currentPage } = this.state;
        let weeks = {}
        if (this.state.showAll && this.props.timesheetSummaries ) {
            weeks = paginate(this.props.timesheetSummaries, currentPage, pageSize)
        }

        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>WeekEnding</th>
                            <th>Total Hours</th>
                            <th>Submission Status</th>
                            <th>Approval Status</th>
                            <th>Option</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!this.state.showAll && this.props.currentWeeklyTimesheets.map(week => (
                            <tr key={week.id}>
                                <td>{convertISO_to_Date(week.weeklyTimesheets.weekEnding)}</td>
                                <td>{week.weeklyTimesheets.totalBillingHours}</td>
                                <td>
                                    <span>{week.weeklyTimesheets.submissionStatus}</span> <span></span>
                                    {week.weeklyTimesheets.submissionStatus === "Incomplete" &&
                                        <Tooltip title={this.tagTextSubmission(week)}>
                                            <span>
                                                <FaInfoCircle />
                                            </span> 
                                        </Tooltip>
                                        }
                                    
                                </td>
                                <td>{week.weeklyTimesheets.approvedStatus}</td>
                                <td>{this.optionTags(week)}</td>
                                <td>
                                    <td>{this.showComment(week)}</td>
                                    <td>
                                        {this.showComment(week) !== '' &&
                                        <Tooltip title={this.tagTextComment(week)}>
                                            <span>
                                                <FaInfoCircle />
                                            </span> 
                                        </Tooltip>
                                        }
                                    </td>
                                    
                                    
                                </td>
                            </tr>
                        
                        ))}
                    

                {this.state.showAll && weeks.map(week => (
                            <tr key={week.id}>
                                <td>{convertISO_to_Date(week.weeklyTimesheets.weekEnding)}</td>
                                <td>{week.weeklyTimesheets.totalBillingHours}</td>
                                <td>
                                    <span>{week.weeklyTimesheets.submissionStatus}</span> <span></span>
                                    {week.weeklyTimesheets.submissionStatus === "Incomplete" &&
                                        <Tooltip title={this.tagTextSubmission(week)}>
                                            <span>
                                                <FaInfoCircle />
                                            </span> 
                                        </Tooltip>
                                        }
                                    
                                </td>
                                <td>{week.weeklyTimesheets.approvedStatus}</td>
                                <td>{this.optionTags(week)}</td>
                                <td>
                                    <td>{this.showComment(week)}</td>
                                    <td>
                                        {this.showComment(week) !== '' &&
                                        <Tooltip title={this.tagTextComment(week)}>
                                            <span>
                                                <FaInfoCircle />
                                            </span> 
                                        </Tooltip>
                                        }
                                    </td>
                                    
                                    
                                </td>
                            </tr>
                        
                        ))}
                    </tbody>
                    
                </table>
                {this.state.showAll && <Pagination itemsCount={count} pageSize={pageSize} currentPage={ currentPage} onPageChange={this.handlePageChange }/>}
                <div className="text-center">
                    {this.props.currentWeeklyTimesheets.length!==0&&<button type="button" className="btn btn-light" onClick={() => this.changeToShowMoreOrLess()}>{this.showMoreTag()}</button>}
                </div>
                
                
            </div>          
        );
    }
    
}
const mapStateToProps = (state) => {
    return {
        timesheetSummaries: state.summaryTimesheets,
        currentWeeklyTimesheets :state.currentWeeklyTimesheets,
        profile : state.profile,
        selectedWeek: state.selectedWeek
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTimesheetSummary: (userID) => dispatch(getTimesheetSummary(userID)),
        getUserProfile : (userID) => dispatch(getUserProfile(userID)),
        setSelectedWeek: (payload) => dispatch({type: actionTypes.SET_SELECTED_WEEK, payload})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Summaries);