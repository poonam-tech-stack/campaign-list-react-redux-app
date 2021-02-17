import React, { useEffect } from 'react';
import CampaignTable from '../../components/CampaignTable';
import selectCampaignsData from '../../selectors/campaignSelector';
import { useDispatch, useSelector } from 'react-redux';
import WithLoading from '../../hoc/withLoading';
import initialCampaigns from '../../data/initial-campaigns.json';

const CampaignTableLoading = WithLoading(CampaignTable);

const Campaigns = () => {
  const dispatch = useDispatch();

  useEffect(() => { /* eslint-disable no-debugger */
    debugger;
    dispatch.campaigns.requestUsers();
    async function fetchUsersAndInitializeCampaigns() {
      //fetch Users data
      await dispatch.campaigns.fetchUsersData();
      //initialize the campaigns
      dispatch.campaigns.addCampaignsData({ newCampaigns: initialCampaigns });
    }
    fetchUsersAndInitializeCampaigns();
  }, [dispatch]);

  const [errorMessage, isLoading, userErrorMessage] = useSelector(({ campaigns: { errorMessage, isLoading, userErrorMessage } }) => [
    errorMessage,
    isLoading,
    userErrorMessage,
  ]);

  const campaigns = useSelector(selectCampaignsData);

  return (
    <>
      <CampaignTableLoading
        campaigns={campaigns}
        isLoading={isLoading}
        errorMessage={errorMessage}
        userErrorMessage={userErrorMessage}
      />
    </>
  );
};

export default Campaigns;
