import { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledProgressBar = styled.div`
  width: 100%;
  height: 2rem;
  background: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 0;
  left: 0;
`;

const StyledProgress = styled.div<{ progressWidth: string }>`
  width: ${({ progressWidth }) => progressWidth};
  background: ${({ theme }) => theme.progressBar};
  height: 100%;
  position: absolute;
  transition: width 1s ease;
`;

const ProgressBar: React.FC<{ index: number }> = ({ index }) => {
    const [progressWidth, setProgressWidth] = useState("");
    
    useEffect(() => {
      let initialProgressWidth = 10;
      initialProgressWidth = initialProgressWidth * (index + 1);
      setProgressWidth(initialProgressWidth + "%");
    }, [index, progressWidth]);
    
    return (
      <StyledProgressBar>
        <StyledProgress progressWidth={progressWidth}></StyledProgress>
      </StyledProgressBar>
    );
}

export default ProgressBar