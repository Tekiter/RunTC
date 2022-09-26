import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FC, MouseEventHandler, ReactNode, useCallback } from "react";

import { color } from "@/styles/color";

interface MenuButtonProps {
  icon?: ReactNode;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  disabled?: boolean;
}

const MenuButton: FC<MenuButtonProps> = ({ icon, children, onClick, disabled = false }) => {
  const handleClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (disabled) {
        return;
      }
      onClick?.(e);
    },
    [onClick, disabled],
  );

  return (
    <StyledMenuItem onClick={handleClick} disabled={disabled ?? false}>
      <IconArea>{icon}</IconArea>
      {children}
    </StyledMenuItem>
  );
};

export default MenuButton;

const StyledMenuItem = styled.div<{ disabled: boolean }>`
  display: flex;
  cursor: pointer;
  border-radius: 6px;
  margin: 0 10px 0 10px;
  padding: 10px 15px;

  font-weight: 500;

  ${({ disabled }) =>
    disabled
      ? css`
          color: ${color.values.disabledForebround};
          cursor: default;
        `
      : css`
          color: ${color.values.grayForeground};
          cursor: pointer;

          &:hover {
            color: ${color.values.foreground};
            background-color: ${color.values.hoverBackground};
          }
        `};
`;

const IconArea = styled.div`
  margin-right: 6px;

  width: 16px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
