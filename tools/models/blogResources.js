"use strict";

let mongoose = require("mongoose");
let moment = require("moment");


let blogResourcesSchema = new mongoose.Schema({
    image: {type: String},
    link: {type: String},
    title: {type: String}
});

let BlogResources = mongoose.model("BlogResources", blogResourcesSchema);

let initialBlogs = [

    {
        image: "/statics/optometryInterviewBlog.png",
        link: "http://www.newgradoptometry.com/everything-need-know-prepare-optometry-job-interview/",
        title: "Everything You Need to Know to Prepare for an Optometry Job Interview"
    },
    {
        image: "/statics/writingGuideBlog.png",
        link: "http://www.newgradoptometry.com/resume-writing-guide-optometrists/",
        title: "The Resume Writing Guide for Optometrists"
    },
    {
        image: "/statics/officeCultureBlog.png",
        title: "How To Maintain Engaging Culture in Your Practice",
        link: "https://covalentcareers.com/blog/detail/how-to-maintain-engaging-culture-in-your-practice/"
    },
    {
        image: "/statics/firstImpressionBlog.png",
        title: "How to Create a Great First Impression For your Patients",
        link: "https://covalentcareers.com/blog/detail/how-to-create-a-great-first-impression-for-your-pa/"
    }

];

/*for (let blog of initialBlogs) {
    BlogResources.create(blog);
}*/


module.exports = BlogResources;