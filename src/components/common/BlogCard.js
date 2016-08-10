"use strict";

import React, {PropTypes} from "react";

export const BlogCard = ({blog}) => {
    return (
        <div className="col-md-12 card blogCardDiv">
            <img className="img-responsive img-rounded" src={blog.image}/>
            <br/>
            <a className="titleText" href={blog.link} target="_blank">{blog.title}</a>
        </div>
    );
};

BlogCard.propTypes = {
    blog: PropTypes.object
};