import Choice from "./Choice";
import ShortText from "./ShortText";
import Range from "./Range";
import Rating from "./Rating";
import Weight from "./Weight";
import React from 'react';

interface INodeComMap {
  [key: string]: typeof React.Component
}

const nodeComponents: INodeComMap = {
  'choice': Choice,
  'short-text': ShortText,
  'range': Range,
  'rating': Rating,
  'weight': Weight,
}

export function getNodeComponent(type: string): typeof React.Component {
  return nodeComponents[type];
}