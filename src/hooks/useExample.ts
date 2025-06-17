import { useState } from "react";

export function useExample() {
    const [state, setState] = useState(false);
    return { state, setState };
}