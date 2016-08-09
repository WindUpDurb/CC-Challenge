"use strict";

import moment from "moment";

export function daysFromToday(date) {
    return moment(date).fromNow();
}

export function filterJobs(searchParams, partTimeOnly, fullTimeOnly, listingArray) {
    return listingArray.filter(job => {
        let searchMatch = (
            `${job.job_title} ${job.location} ${job.organization}`.toLowerCase()
        ).includes(searchParams.toLowerCase());
        if (searchMatch && partTimeOnly && !fullTimeOnly) return (job.contract_type === "PT");
        if (searchMatch && fullTimeOnly && !partTimeOnly) return (job.contract_type === "FT");
        return searchMatch;
    });
}
