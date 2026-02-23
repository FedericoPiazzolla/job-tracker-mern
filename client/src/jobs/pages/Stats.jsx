import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import "./style/Stats.css";

const STATUS_LABELS = {
  applied: "Applied",
  interviewing: "Interviewing",
  offer: "Offer",
  rejected: "Rejected",
};

const STATUS_COLORS = {
  applied: "#6fa3d9",
  interviewing: "#d9b44a",
  offer: "#5ea579",
  rejected: "#cb6b63",
};

const Stats = () => {
  const [jobs, setJobs] = useState([]);
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    if (!auth.userId) return;

    const fetchJobs = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5010/api/jobs/user/${auth.userId}`
        );
        setJobs(responseData.jobs || []);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Stats fetch error:", err);
      }
    };

    fetchJobs();
  }, [auth.userId, sendRequest]);

  const totals = useMemo(() => {
    const counts = {
      applied: 0,
      interviewing: 0,
      offer: 0,
      rejected: 0,
    };

    for (const job of jobs) {
      const status = (job.status || "").toLowerCase();
      if (status === "interview") {
        counts.interviewing += 1;
      } else if (Object.prototype.hasOwnProperty.call(counts, status)) {
        counts[status] += 1;
      }
    }

    const total = jobs.length;
    return { counts, total };
  }, [jobs]);

  const percentages = useMemo(() => {
    const { counts, total } = totals;
    if (!total) {
      return {
        applied: 0,
        interviewing: 0,
        offer: 0,
        rejected: 0,
      };
    }

    return {
      applied: Math.round((counts.applied / total) * 100),
      interviewing: Math.round((counts.interviewing / total) * 100),
      offer: Math.round((counts.offer / total) * 100),
      rejected: Math.round((counts.rejected / total) * 100),
    };
  }, [totals]);

  const donutBackground = useMemo(() => {
    const pApplied = percentages.applied;
    const pInterviewing = percentages.interviewing;
    const pOffer = percentages.offer;
    const pRejected = Math.max(
      0,
      100 - (pApplied + pInterviewing + pOffer)
    );

    const p1 = pApplied;
    const p2 = pApplied + pInterviewing;
    const p3 = p2 + pOffer;
    const p4 = p3 + pRejected;

    return `conic-gradient(
      ${STATUS_COLORS.applied} 0% ${p1}%,
      ${STATUS_COLORS.interviewing} ${p1}% ${p2}%,
      ${STATUS_COLORS.offer} ${p2}% ${p3}%,
      ${STATUS_COLORS.rejected} ${p3}% ${p4}%
    )`;
  }, [percentages]);

  const statusKeys = ["applied", "interviewing", "offer", "rejected"];

  return (
    <section className="stats-page">
      <div className="stats-page__card">
        <header className="stats-page__header">
          <h1>Application Stats</h1>
          <p>Overview of your applications by current status.</p>
        </header>

        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}

        {!isLoading && (
          <>
            <div className="stats-page__summary">
              <div className="stats-page__summary-box">
                <span>Total Applications</span>
                <strong>{totals.total}</strong>
              </div>
              <div className="stats-page__summary-box">
                <span>Active Pipeline</span>
                <strong>{totals.counts.applied + totals.counts.interviewing}</strong>
              </div>
              <div className="stats-page__summary-box">
                <span>Offer Rate</span>
                <strong>{percentages.offer}%</strong>
              </div>
            </div>

            <div className="stats-page__content">
              <div className="stats-page__donut-wrap">
                <div
                  className="stats-page__donut"
                  style={{ background: donutBackground }}
                >
                  <div className="stats-page__donut-inner">
                    <span>{totals.total}</span>
                    <small>jobs</small>
                  </div>
                </div>
              </div>

              <div className="stats-page__bars">
                {statusKeys.map((key) => (
                  <div className="stats-page__bar-row" key={key}>
                    <div className="stats-page__bar-top">
                      <span>{STATUS_LABELS[key]}</span>
                      <span>
                        {totals.counts[key]} ({percentages[key]}%)
                      </span>
                    </div>
                    <div className="stats-page__bar-track">
                      <div
                        className="stats-page__bar-fill"
                        style={{
                          width: `${percentages[key]}%`,
                          backgroundColor: STATUS_COLORS[key],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <ErrorModal error={error} onClear={clearError} />
    </section>
  );
};

export default Stats;
