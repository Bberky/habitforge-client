import { ComponentType, FC, PropsWithChildren } from "react";

type ConditionalWrapperProps = {
  condition: boolean;
  Wrapper: ComponentType<PropsWithChildren>;
};

export const ConditionalWrapper: FC<
  PropsWithChildren<ConditionalWrapperProps>
> = (props) => {
  const { children, condition, Wrapper } = props;

  return condition ? <Wrapper>{children}</Wrapper> : children;
};
