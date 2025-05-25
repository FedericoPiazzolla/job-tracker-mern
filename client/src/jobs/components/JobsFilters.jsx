import React from "react";

const JobsFilters = ({
  sortOrder,
  setSortOrder,
  statusFilter,
  setStatusFilter,
}) => (
  <div className="user-jobs__filters">
    <label>
      Sort by date:{" "}
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="desc">Newest first</option>
        <option value="asc">Oldest first</option>
      </select>
    </label>
    <label>
      Status:{" "}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="applied">Applied</option>
        <option value="interviewing">Interviewing</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
      </select>
    </label>
  </div>
);

export default JobsFilters;
