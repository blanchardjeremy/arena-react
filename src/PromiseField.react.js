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

    if (promise === "") {
      // Unset the date if there's no promise currently
      setCurrentPromiseDate(null);
      ls.set("currentPromiseDate", null);
    } else {
      const date = DateTime.local();
      setCurrentPromiseDate(date);
      ls.set("currentPromiseDate", date.toString());
    }
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
    if (currentPromiseDate) {
      if (DateTime.local().diff(currentPromiseDate).hours > 20) {
        bumpPromise();
      }
    }
  }

  return (
    <>
      <h4>
        Setting the Arena with a Buddy
        <Button
          variant="secondary"
          size="sm"
          className="float-right"
          onClick={(e) => bumpPromise()}
        >
          Set New Promise
        </Button>
      </h4>

      {!priorPromiseDate || !priorPromiseDate.isValid ? null : (
        <>
          <Form.Group controlId="promise-field">
            <Form.Label>
              <span class="fill-in-the-blank capitalize">
                {priorPromiseDate.toRelativeCalendar()} (
                {priorPromiseDate.toFormat("cccc")})
              </span>
              , I said I would sent the arena before{" "}
              <span class="fill-in-the-blank">{priorPromise}</span> and I{" "}
              <strong>[DID / DID NOT]</strong> do what I said I would do.
            </Form.Label>
          </Form.Group>
        </>
      )}
      <Form.Group controlId="promise-field">
        <Form.Label>
          Today I will bring clarify, focus, ease and grace to ___________ by
          setting the Coaching Arena beforehand.
        </Form.Label>
        <Form.Control
          type="promise"
          placeholder="example: calling my doctor"
          onChange={(e) => updateCurrentPromise(e.target.value)}
          value={currentPromise}
        />
        <Form.Text className="text-muted">
          <em>
            {!currentPromiseDate || !currentPromiseDate.isValid ? null : (
              <>
                You set this promise {currentPromiseDate.toRelativeCalendar()}
              </>
            )}
          </em>
        </Form.Text>
      </Form.Group>
    </>
  );
}
