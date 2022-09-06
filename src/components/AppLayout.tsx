import styled from "@emotion/styled";
import { FC, ReactNode } from "react";

interface AppLayoutProps {
  leftPanel: ReactNode;
  content: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ leftPanel, content }) => {
  return (
    <StyledAppLayout>
      <LeftPanelSlot>{leftPanel}</LeftPanelSlot>
      <ContentSlot>{content}</ContentSlot>
    </StyledAppLayout>
  );
};

export default AppLayout;

const StyledAppLayout = styled.div`
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;

  display: flex;
  flex-direction: row;
`;

const LeftPanelSlot = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const ContentSlot = styled.div`
  flex-grow: 1;
`;
