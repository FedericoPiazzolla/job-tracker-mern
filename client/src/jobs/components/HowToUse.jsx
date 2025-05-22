import React from "react";
import "./style/HowToUse.css";

const HowToUse = () => {
  return (
    <div className="how-to-use">
      <div className="container">
        <h2>How to Use Jobs Tracker</h2>
        <ol>
          <li>
            <strong>Register</strong> or <strong>log in</strong> if you already
            have an account.
          </li>
          <li>
            Go to <strong>My Jobs</strong> from the navigation menu.
          </li>
          <li>
            Click the <strong> + </strong> button if you haven't added any jobs
            yet.
          </li>
          <li>
            On the My Jobs page, you'll find all the information you need:
            <ul>
              <li>Your job applications</li>
              <li>Statistics about your applications</li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default HowToUse;
