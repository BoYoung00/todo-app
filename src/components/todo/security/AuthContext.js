import { createContext, useState } from "react";

// 여러 컴포넌트 간에 데이터 공유하기 위함
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [number, setNumber] = useState(0);
    return (
        <AuthContext.Provider value={{ number }}>
            {children}
        </AuthContext.Provider>
    );
}
