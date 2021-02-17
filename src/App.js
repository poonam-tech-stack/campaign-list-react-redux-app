import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Filters from './containers/Filters';
import Campaigns from './containers/Campaigns';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

//Contains skeleton structure of the website
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //AddCampaigns global method on window object
    window.AddCampaigns = (newCampaigns) => {
      dispatch.campaigns.addCampaignsData({newCampaigns});
    };
  }, [dispatch]);

  return (
    <>
      <div className="App">
        <div className=" display-flex flex-column flex-wrapper">
          <div className="flex-fixed">
            <Header />
          </div>
          <div className="flex-fixed">
            <Filters />
          </div>
          <div className="flex-dynamic">
            <div className="flex-normaliser">
              <Campaigns />
            </div>
          </div>
          <div className="flex-fixed">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
