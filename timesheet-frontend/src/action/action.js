import * as actionType from './actionTypes';
import { fetchAllTimesheets, getProfile} from '../services/ApiService';


export const getTimesheetSummary = (userID) => (dispatch) => {
    return fetchAllTimesheets(userID)
    .then((response) => 
    {
        dispatch({type: actionType.GET_TIMESHEET_SUMMARY, payload: response.data});
    })
}

export const getUserProfile = (userID) => (dispatch) => {
    return getProfile(userID)
    .then((response) => 
    {
        dispatch({type: actionType.GET_PROFILE, payload: response.data});
    })
}
