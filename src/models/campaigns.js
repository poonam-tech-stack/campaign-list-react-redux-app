import fetchUsers from '../apis/fetchUsers';
import { validateCampaign, addUserNameToCampaign } from '../utils/campaignUtilMethods';
import logger from '../utils/logger';
import ERROR_MESSAGES from '../constants/errorMessages';


const initialState = {
  campaigns: [],
  errorMessage: null,
  users: [],
  userErrorMessage: null,
  isLoading: false,
};

const campaigns = {
  state: initialState, // initial state
  reducers: {
    // handle state changes with pure functions
    addCampaigns(state, payload) {
      return { ...state, ...payload };
    },
    requestUsers(state, payload) {
      return { ...state, ...payload, isLoading: true };
    },
    setUsersSuccess(state, payload) {
      return { ...state, ...payload, isLoading: false };
    },
    setUsersFailure(state, payload) {
      return { ...state, ...payload, isLoading: false };
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async fetchUsersData() { /* eslint-disable no-debugger */
      debugger;
      const { users, isError } = await fetchUsers();
      if (!isError) dispatch.campaigns.setUsersSuccess({ users });
      else
        dispatch.campaigns.setUsersFailure({ users, userErrorMessage: ERROR_MESSAGES.NO_USER_DATA });
    },
    addCampaignsData({ newCampaigns }, state) {  /* eslint-disable no-debugger */
      debugger;
      //Check if newCampaings is array and has atleast one element
      let inValidCampaignErrorMessage = [];
      if (newCampaigns && Array.isArray(newCampaigns) && newCampaigns.length) {
        //Validate each new campaign and push in to validCampaigns array
        const validCampaigns = newCampaigns.filter((c) => {
          const [campaign, errorMessage] = validateCampaign(c);
          if (errorMessage) {
            inValidCampaignErrorMessage.push(errorMessage);
          }
          if (campaign) {
            return campaign;
          }
        });
        //If validCampaigns are available
        if (validCampaigns.length) {
          //If validCampaigns are lesser than newCampaigns, warn user that some campaigns are invalid
          if (validCampaigns.length !== newCampaigns.length)
            logger.warn('Some campaigns are invalid.');
          const modifiedCampaigns = addUserNameToCampaign(validCampaigns, state.campaigns.users);
          logger.info('New Campaigns Successfully added!');
          return dispatch.campaigns.addCampaigns({
            campaigns: [...modifiedCampaigns, ...state.campaigns.campaigns],
            errorMessage: inValidCampaignErrorMessage,
          });
        }
      }
      // If no campaigns are available when adding campaigns from console
      logger.error(ERROR_MESSAGES.INVALID_CAMPAIGN);
      return dispatch.campaigns.addCampaigns({ errorMessage: inValidCampaignErrorMessage });
    },
  }),
};

export default campaigns;
