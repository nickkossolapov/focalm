import React from "react";

export default function Day(props) {
  return <li key={props.key}>{props.day + 1}</li>;
}