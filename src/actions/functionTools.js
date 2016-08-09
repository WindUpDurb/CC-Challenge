"use strict";

import moment from "moment";

export function daysFromToday(date) {
    return moment(date).fromNow();
}

export function searchThroughJobs(searchParams, listingArray) {
    return listingArray.filter(job => {
        let searchThrough = (
            `${job.job_title} ${job.location} ${job.organization}`.toLowerCase()
        );
        return searchThrough.includes(searchParams.toLowerCase());
    });
}