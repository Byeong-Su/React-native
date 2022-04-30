import { useState, useEffect } from 'react';

export const useFetch = url => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    //API 상태를 관리하는 inProgress
    const [inProgress, setInProgress] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setInProgress(true);
                //전달받은 api에 주소 요청
                const res = await fetch(url);
                const result = await res.json();
                //성공시 data반환 실패시 error 반환
                if (res.ok) {
                    setData(result);
                    setError(null);
                } else {
                    throw result;
                }
            } catch (error) {
                setError(error);
            } finally {
                setInProgress(false);
            }
        };
        fetchData();
    }, []);

    return { data, error, inProgress };
};