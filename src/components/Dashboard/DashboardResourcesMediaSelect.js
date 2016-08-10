"use strict";

import React, {PropTypes} from "react";

export const DashboardResourcesMediaSelect = ({changeMediaSection}) => {
    
    return (
        <div id="searchPanel" className="panel panel-default">
            <div className="panel-heading">Resources</div>
            <div className="panel-body">
                <div className="row">
                    <div className="col-sm-5 col-sm-offset-1 col-md-5 col-md-offset-1">
                        <div className="mediaDiv">
                            <img name="blog" onClick={changeMediaSection} className="mediaSelect" src="/statics/news.png" />
                        </div>
                    </div>
                    <div className="col-sm-5 col-sm-offset-1 col-md-5 col-md-offset-1">
                        <div className="mediaDiv">
                            <img  name="videoSelect" onClick={changeMediaSection} className="mediaSelect" src="/statics/television.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    );
};

DashboardResourcesMediaSelect.propTypes = {
    changeMediaSection: PropTypes.func
};