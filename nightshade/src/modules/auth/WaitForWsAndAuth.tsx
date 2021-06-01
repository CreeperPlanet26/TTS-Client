import { useConn } from "../../shared-hooks/useConn";
import { useHasTokens } from "./useHasTokens";

export const WaitForWsAndAuth: React.FC = ({ children }) => {
    const conn = useConn();
    const hasTokens = useHasTokens();

    // If there is no websocket connection return nothing
    if (!conn) return <h1>loading</h1>;

    // If user is not logged in just show the page
    if (!hasTokens) return null;

    // If user is logged in but user not loaded yet return nothing
    if (!conn?.user) return null;

    // Once user is loaded show the page
    return <>{children}</>;
};
