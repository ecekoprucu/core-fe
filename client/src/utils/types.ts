export type DataContextType = {
    clients: any[] | null;
    setClients: (clientid: any[]) => void;
    userEmail: string | undefined;
    setUserEmail: (userEmail: string | undefined) => void;
    userid: number | string | null;
    setUserid: (userid: number | string | null) => void;
}