// @flow

import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import "./App.scss";
import ls from "local-storage";
import Button from "react-bootstrap/button";
import VerticalButtons from "./VerticalButtons.react";
import PromiseField from "./PromiseField.react";

const QUALITIES: $ReadOnlyArray<string> = [
  "Alert",
  "Appreciative",
  "Attentive",
  "Clear",
  "Compassionate",
  "Courageous",
  "Creative",
  "Empowering",
  "Enthusiastic",
  "Flexible",
  "Focused",
  "Generous",
  "Gentle",
  "Grateful",
  "Joyous",
  "Kind",
  "Loving",
  "Open",
  "Present",
  "Receptive",
  "Supportive",
  "Truthful",
  "Vulnerable",
];

const QUESTIONS = {
  full: {
    1: "Who am I willing to be in order to produce an extraordinary result out of this interaction?",
    2: "Am I willing to systematically dismantle my structure of knowing?",
    3: "Am I willing to be a demand for coaching?",
    4: "Am I willing to guarantee that whoever coaches me will be successful?",
  },
  client: {
    1: "There are some qualities I am willing to demonstrate in this interaction so we can both make sure we have an extraordinary result out of our session together:",
    2: "During the session am I willing to set aside the opinions, beliefs, and thoughts that may be getting in the way of seeing something clearly?",
    3: "Am I willing to be open-minded and fully engaged in order to receive maximum benefit from this time together?",
    4: "The result of coaching in this model is always action. Am I willing to see the most authentic action to take? If I am the person being coached, am I willing to take it?",
  },
};

function getArenaType() {
  return window.location.pathname === "/client" ? "client" : "full";
}

const arenaType = getArenaType();

const activeQuestions = QUESTIONS[arenaType];

const MAX_QUALITIES = 5;

function App(): React$MixedElement {
  const [activeQualities, setActiveQualities] = useState<
    $ReadOnlyArray<string>
  >([]);

  // Load qualities on initial load
  useLayoutEffect(() => {
    const qualities = ls.get("activeQualities");
    if (qualities != null && qualities.length > 0) {
      setActiveQualities(qualities);
    }
  }, []);

  useEffect(() => {
    // TODO: Throttle this?
    ls.set("activeQualities", activeQualities);
  }, [activeQualities]);

  const toggleQuality = useCallback(
    (word: string): void => {
      // eslint-disable-next-line no-unused-expressions
      document.activeElement?.blur();
      if (activeQualities.includes(word)) {
        setActiveQualities(activeQualities.filter((w) => w !== word));
      } else if (activeQualities.length < MAX_QUALITIES) {
        setActiveQualities(activeQualities.concat(word));
      }
    },
    [activeQualities]
  );

  const isMaxQualities = activeQualities.length >= MAX_QUALITIES;

  return (
    <div className="App">
      <div className="container-narrow">
        <div className="masthead">
          <h1 className="muted">The Coaching Arena</h1>
        </div>

        <div id="qualities">
          <h4>
            Qualities of Being{" "}
            <Button
              variant="warning"
              size="sm"
              id="clear_qualities"
              className="float-right"
              onClick={() => setActiveQualities([])}
            >
              Reset
            </Button>
          </h4>
          <ul>
            {QUALITIES.map((word) => {
              const isActive = activeQualities.includes(word);
              return (
                <li key={word}>
                  <Button
                    variant={isActive ? "primary" : "light"}
                    onClick={() => toggleQuality(word)}
                    disabled={isMaxQualities && !isActive}
                  >
                    {word}
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>

        <div id="questions">
          <h4>Arena Questions</h4>
          <ol>
            <li>
              <span className="question">{activeQuestions[1]}</span>
              <p>
                <em>I am willing to be:</em>
              </p>
              <div style={{ marginBottom: 12 }}>
                <VerticalButtons
                  words={activeQualities}
                  fillLength={MAX_QUALITIES}
                />
              </div>
            </li>
            <li>
              <span className="question">{activeQuestions[2]}</span>
              <br />
              <em>('Yes' or 'No')</em>
            </li>
            <li>
              <span className="question">{activeQuestions[3]}</span>
              <br />
              <em>('Yes' or 'No')</em>
            </li>
            <li>
              <span className="question">{activeQuestions[4]}</span>
              <br />
              <em>('Yes' or 'No')</em>
            </li>
          </ol>
        </div>

        <div id="promise-container">
          <PromiseField />
        </div>

        <hr />
        <p>
          <em>
            SetTheArena.com: <a href="/">Main Arena</a> •{" "}
            <a href="/client">Client Arena</a>
          </em>
        </p>

        <div className="footer">
          <p>
            Copyright &copy; 1997-{new Date().getFullYear()}{" "}
            <a href="https://acecoachtraining.com/">
              Academy for Coaching Excellence
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
