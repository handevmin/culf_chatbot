import React from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

function MathRenderer({ text }) {
  return (
    <MathJaxContext>
      <MathJax>{text}</MathJax>
    </MathJaxContext>
  );
}

export default MathRenderer;