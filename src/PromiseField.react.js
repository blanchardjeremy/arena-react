// @flow

import React, { useLayoutEffect, useState } from "react";
import "./PromiseField.react.scss";
import { Button, Form } from "react-bootstrap";
import ls from "local-storage";
var { DateTime } = require("luxon");

export default function PromiseField(props: {
  test?: string,
}): React.ReactElement {
  const [currentPromise, setCurrentPromise] = useState();
  const [currentPromiseDate, setCurrentPromiseDate] = useState();

  const [priorPromise, setPriorPromise] = useState();
  const [priorPromiseDate, setPriorPromiseDate] = useState();

  // Load current promise on initial load
  useLayoutEffect(() => {
    setCurrentPromise(ls.get("currentPromise"));
    setCurrentPromiseDate(DateTime.fromISO(ls.get("currentPromiseDate")));

    setPriorPromise(ls.get("priorPromise"));
    setPriorPromiseDate(DateTime.fromISO(ls.get("priorPromiseDate")));

    checkForPromiseBump();
  }, []);

  function updateCurrentPromise(promise) {
    setCurrentPromise(promise);
    ls.set("currentPromise", promise);

    const date = DateTime.local();
    setCurrentPromiseDate(date);
    ls.set("currentPromiseDate", date.toString());
  }

  function updatePriorPromise(promise, date) {
    setPriorPromise(promise);
    ls.set("priorPromise", promise);

    setPriorPromiseDate(date);
    ls.set("priorPromiseDate", date.toString());
  }

  function bumpPromise() {
    updatePriorPromise(currentPromise, currentPromiseDate);
    updateCurrentPromise("");
  }

  function checkForPromiseBump() {
    debugger;
    if (currentPromiseDate) {
      if (DateTime.local().diff(currentPromiseDate).hours > 20) {
        bumpPromise();
      }
    }
  }

  return (
    <>
      <h4>
        Promise
        <Button
          variant="secondary"
          size="sm"
          className="float-right"
          onClick={(e) => bumpPromise()}
        >
          Set New Promise
        </Button>
      </h4>
      <Form.Group controlId="promise-field">
        <Form.Label>
          Today I will bring clarify, focus, ease and grace to ___________ by
          setting the Coaching Arena beforehand.
        </Form.Label>
        <Form.Control
          type="promise"
          placeholder="Your promise for today"
          onChange={(e) => updateCurrentPromise(e.target.value)}
          value={currentPromise}
        />
        <Form.Text className="text-muted">
          <em>
            Promise set{" "}
            {!currentPromiseDate
              ? null
              : currentPromiseDate.toRelativeCalendar()}
          </em>
        </Form.Text>
      </Form.Group>

      {!priorPromiseDate ? null : (
        <>
          <h5>Prior promise:</h5>
          <p>
            <strong style={{ textTransform: "capitalize" }}>
              {priorPromiseDate.toRelativeCalendar()} (
              {priorPromiseDate.toFormat("cccc")}):
            </strong>{" "}
            {priorPromise}
          </p>
        </>
      )}
    </>
  );
}
