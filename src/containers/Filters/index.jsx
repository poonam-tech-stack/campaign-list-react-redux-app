import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { InputDateFormat } from '../../constants/dateConstants';
import './index.css';
import FilterForm from '../../components/FilterForm';
import { selectFilters } from '../../selectors/campaignSelector';

//Displays the start date, end date and campaign search filters
const Filters = () => {
  const [isFiltersDisplayedInSmallScreen, setIsFiltersDisplayedInSmallScreen] = useState(false);

  const [startDate, endDate, searchTerm] = useSelector(selectFilters);

  const dispatch = useDispatch();

  //Update when start date filter is changed
  const changeStartDateHandler = (startDate) => {
    dispatch.filters.changeStartDate({ startDate });
  };

  //Update when end date filter is changed
  const changeEndDateHandler = (endDate) => {
    dispatch.filters.changeEndDate({ endDate });
  };

  //Update when campaign name search filter is changed
  const changeSearchTermHandler = (evt) => {
    const searchTerm = evt.target.value;
    dispatch.filters.changeSearchTerm({ searchTerm });
  };

  const handleReset = () => {
    dispatch.filters.resetFilters();
  };

  const toggleFiltersHandler = () => {
    setIsFiltersDisplayedInSmallScreen(!isFiltersDisplayedInSmallScreen);
  };

  const startDateFormatted = startDate && moment(startDate, InputDateFormat).toDate();
  const endDateFormatted = endDate && moment(endDate, InputDateFormat).toDate();

  return (
    <FilterForm
      changeStartDateHandler={changeStartDateHandler}
      changeEndDateHandler={changeEndDateHandler}
      changeSearchTermHandler={changeSearchTermHandler}
      handleReset={handleReset}
      searchTerm={searchTerm}
      toggleFiltersHandler={toggleFiltersHandler}
      startDateFormatted={startDateFormatted}
      endDateFormatted={endDateFormatted}
      isFiltersDisplayedInSmallScreen={isFiltersDisplayedInSmallScreen}
    />
  );
};

export default Filters;
