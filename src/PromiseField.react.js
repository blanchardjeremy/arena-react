// @flow

import React, { useLayoutEffect, useState } from "react";
import "./PromiseField.react.scss";
import { Button, Form } from "react-bootstrap";
import ls from "local-storage";
var { DateTime } = require("luxon");

export default function PromiseField(props: {
  test?: string,
}): React.ReactElement {
  const [promise, setPromise] = useState();
  const [promiseDate, setPromiseDate] = useState();

  // Load current promise on initial load
  useLayoutEffect(() => {
    const currentPromise = ls.get("currentPromise");
    setPromise(currentPromise);
    const currentPromiseDate = DateTime.fromISO(ls.get("currentPromiseDate"));
    setPromiseDate(currentPromiseDate);
  }, []);

  function updatePromise(updatedPromise) {
    setPromise(updatedPromise);
    ls.set("currentPromise", updatedPromise);

    const curDate = DateTime.local();
    setPromiseDate(curDate);
    ls.set("currentPromiseDate", curDate.toString());
  }

  return (
    <>
      <h4>
        Promise
        <Button
          variant="secondary"
          size="sm"
          className="float-right"
          onClick={(e) => updatePromise("")}
        >
          Clear Promise
        </Button>
      </h4>
      <Form.Group controlId="promise-field">
        <Form.Label>Enter your promise for today</Form.Label>
        <Form.Control
          type="promise"
          placeholder="Your promise for today"
          onChange={(e) => updatePromise(e.target.value)}
          value={promise}
        />
        <Form.Text className="text-muted">
          Today I will bring clarify, focus, ease and grace to ___________ by
          setting the Coaching Arena beforehand.
        </Form.Text>
      </Form.Group>

      <h5>Recent promise:</h5>
      <ul>
        <li>
          Date: {!promiseDate ? null : promiseDate.toRelativeCalendar()}
          <br />
          Promise: {promise}
        </li>
      </ul>
    </>
  );
}
