import styled from "@emotion/styled";
import { Allotment } from "allotment";
import { FC, ReactNode } from "react";

import { color } from "@/styles/color";

interface AppLayoutProps {
  leftPanel: ReactNode;
  content: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ leftPanel, content }) => {
  return (
    <StyledAppLayout>
      <Allotment>
        <Allotment.Pane minSize={200} preferredSize={300}>
          <LeftPanelSlot>{leftPanel}</LeftPanelSlot>
        </Allotment.Pane>
        <Allotment.Pane>
          <ContentSlot>{content}</ContentSlot>
        </Allotment.Pane>
      </Allotment>
    </StyledAppLayout>
  );
};

export default AppLayout;

const StyledAppLayout = styled.div`
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
`;

const LeftPanelSlot = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;

  background-color: ${color.values.backgroundSurface};
`;

const ContentSlot = styled.div`
  height: 100%;
  flex-grow: 1;

  background-color: ${color.values.background};
`;
