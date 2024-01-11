import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setAppState } from "../../store/slices/app/appStateSlice";


type Props = {
  state?: string,
  children: ReactNode;
};

const PageWrapper = (props: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (props.state) {
      dispatch(setAppState(props.state));
    }
  }, [dispatch, props]);

  return (
    <>{props.children}</>
  );
};

export default PageWrapper;