import { useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

export default function useModalNavigation(
    param: string,
    isModalOpen: boolean,
    closeModal: () => void,
) {
    const isModalOpenRef = useRef(isModalOpen);
    const searchParams = useSearchParams();

    useLayoutEffect(() => {
        isModalOpenRef.current = isModalOpen;
    }, [isModalOpen])

    const pushModal = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(param, value);
        window.history.pushState(null, "", `?${params.toString()}`);
    }

    const popModal = () => {
        window.history.back();
    }

    // Check if the modal should be closed when the URL changes
    useEffect(() => {
        const hasParam = searchParams.has(param);
        // If user navigates away from the modal
        if (!hasParam && isModalOpenRef.current) {
            closeModal();
        }
        // If user navigates back to the modal, remove the param
        if (hasParam && !isModalOpenRef.current) {
            const params = new URLSearchParams(searchParams.toString());
            params.delete(param);
            window.history.replaceState(null, "", `?${params.toString()}`);
        }
    }, [searchParams, param, closeModal]);

    return {
        pushModal,
        popModal
    };
}