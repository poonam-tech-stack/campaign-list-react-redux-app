import moment from 'moment';
import logger from '../utils/logger';
import { InputDateFormat } from '../constants/dateConstants';

const initialState = {
  startDate: null,
  endDate: null,
  searchTerm: null,
};

//Method to update date - used for both startDate and endDate filters update
const changeDate = (state, date, property) => {
  const newDate = moment(date);
  //Check if the date is valid
  if (newDate.isValid()) {
    const updatedState = {
      ...state,
    };
    updatedState[property] = newDate.format(InputDateFormat);
    //if endDate is already available and startDate is updated, check if endDate is less than startDate. If yes, remove endDate
    if (
      property === 'startDate' &&
      updatedState.startDate &&
      moment(updatedState.startDate, InputDateFormat) >
        moment(updatedState.endDate, InputDateFormat)
    ) {
      updatedState.endDate = null;
    }
    return updatedState;
  } else {
    //If date is not valid, alert user
    logger.error(`${property} value is invalid.`);
  }
  return state;
};

//Update startDate filter in global store
const changeStartDate = (state,  { startDate } = {} ) =>
  changeDate(state, startDate, 'startDate');

//Update endDate filter in global store
const changeEndDate = (state, { endDate } = {}) =>
  changeDate(state, endDate, 'endDate');

//Update searchTerm (campaign name) filter in global store
const changeSearchTerm = (state,{ searchTerm } = {} ) => ({
  ...state,
  searchTerm: searchTerm || null,
});

//Reset filters in global store
const resetFilters = () => ({
  ...initialState,
});

const filters = {
  state: initialState,
  reducers: {
    changeStartDate(state, payload){
      return changeStartDate(state, payload);
    },
    changeEndDate(state, payload){
      return changeEndDate(state, payload);
    },
    changeSearchTerm(state, payload){
      return changeSearchTerm(state, payload);
    },
    resetFilters(){
      return resetFilters();
    },
  }
}
export default filters;
