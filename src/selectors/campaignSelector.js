import { createSelector } from '@rematch/select';
import moment from 'moment';
import { InputDateFormat, OutputDateFormat } from '../constants/dateConstants';
import { isCampaignActive, filterCampaigns } from '../utils/campaignUtilMethods';
import { formatNumberToUSD } from '../utils/helperMethods';

export const selectFilters = ({ filters: { startDate, endDate, searchTerm } }) => [
  startDate,
  endDate,
  searchTerm,
];

const selectCampaigns = ({ campaigns: { campaigns } }) => campaigns;

const selectFilteredCampaigns = createSelector(
  selectCampaigns,
  selectFilters,
  (campaigns, [startDate, endDate, searchTerm]) => {
    return campaigns.length !== 0 && filterCampaigns({ campaigns, startDate, endDate, searchTerm });
  },
);

const selectCampaignsData = createSelector(selectFilteredCampaigns, (campaigns) => {
  if (!campaigns) return [];
  return campaigns.map(({ userName, name, startDate, endDate, Budget: budget }) => ({
    name,
    userName,
    startDate: moment(startDate, InputDateFormat).format(OutputDateFormat),
    endDate: moment(endDate, InputDateFormat).format(OutputDateFormat),
    isActive: isCampaignActive(startDate, endDate),
    budgetInUSD: formatNumberToUSD(budget),
  }));
});

export default selectCampaignsData;
