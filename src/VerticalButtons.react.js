// @flow

import React from "react";
import "./VerticalButtons.react.scss";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

type Props = {|
  words: $ReadOnlyArray<string>,
  fillLength: number,
|};

function VerticalButtons({ words, fillLength }: Props): React.MixedElement {
  const wordsWithFill = words;

  return (
    <ul className="verticalButtons-list">
      {wordsWithFill.map((word, index) => (
        <li key={index}>
          <Button children={word} variant={"outline-primary"} disabled={true} />
        </li>
      ))}
      {wordsWithFill.length < fillLength && (
        <li>
          <Alert variant="warning">
            Select{" "}
            <strong>
              {fillLength - wordsWithFill.length} more{" "}
              {fillLength - wordsWithFill.length > 1 ? "qualities" : "quality"}{" "}
            </strong>
            from the list above
          </Alert>
        </li>
      )}
    </ul>
  );
}

export default VerticalButtons;
