export type DataContextType = {
    clientid: number | string | null;
    setClientid: (clientid: number | string | null) => void;
    userEmail: string | undefined;
    setUserEmail: (userEmail: string | undefined) => void;
    userid: number | string | null;
    setUserid: (userid: number | string | null) => void;
}