import styled from "@emotion/styled";
import { FC, ReactNode } from "react";

interface PanelFrameProps {
  title: string;
  children?: ReactNode;
}

const PanelFrame: FC<PanelFrameProps> = ({ title, children }) => {
  return (
    <StyledPanelFrame>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </StyledPanelFrame>
  );
};

export default PanelFrame;

const StyledPanelFrame = styled.div``;

const Title = styled.h3``;

const Content = styled.div``;
