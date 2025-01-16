import React, { useEffect, useState } from 'react';
import { Colors } from '../../Utilities/Colors';

interface VerticalLinesProps {
  noOfLines?: number;
  height?: number;
  width?: number;
  color?: string;
  lineStyle?: 'solid' | 'dashed';
}

const VerticalLines = ({
  noOfLines,
  height = 30,
  width = 5,
  color = Colors.applicationColor,
  lineStyle = 'solid',
}: VerticalLinesProps) => {
  const [lineCount, setLineCount] = useState(noOfLines || 100);

  const updateLineCount = () => {
    if (noOfLines) return; // Use `noOfLines` if provided and skip screen-based logic.

    const screenWidth = window.innerWidth;

    if (screenWidth < 800) {
      setLineCount(30);
    } else if (screenWidth < 1000) {
      setLineCount(35);
    } else if (screenWidth < 1200) {
      setLineCount(40);
    } else if (screenWidth < 2500) {
      setLineCount(45);
    } else {
      setLineCount(70);
    }
  };

  useEffect(() => {
    if (noOfLines) return; // Skip effect logic if `noOfLines` is provided.

    updateLineCount();
    window.addEventListener('resize', updateLineCount);

    return () => {
      window.removeEventListener('resize', updateLineCount);
    };
  }, [noOfLines]);

  const lines = Array(lineCount).fill(0);

  return (
    <div style={{ display: 'flex', gap: '5px' }}>
      {lines.map((_, index) => (
        <div
          key={index}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            background:
              lineStyle === 'solid'
                ? color
                : `repeating-linear-gradient(to bottom, ${color}, ${color} 2px, transparent 2px, transparent 5px)`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default VerticalLines;
