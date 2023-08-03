import React, { useState } from "react";
import { DataContextType } from "../utils/types";

const DataContext = React.createContext<DataContextType | undefined>(undefined);

type Props = {
    children: React.ReactNode;
};

export const DataProvider = ({ children }: Props) => {
    const [clientid, setClientid] = useState<string | number | null>(null);
    const [userid, setUserid] = useState<string | number | null>(null);
    const [userEmail, setUserEmail] = useState<string | undefined>(undefined);

    return (
        <DataContext.Provider value={{ clientid, setClientid, userid, setUserid, userEmail, setUserEmail }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;